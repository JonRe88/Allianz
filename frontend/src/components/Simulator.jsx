import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ArrowUpRight, CalendarDays, Download } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RISK_PROFILES, PRODUCT_LIST, IMAGES } from "@/data/products";
import { fmtMXN } from "@/lib/api";

const RETIREMENT_AGE = 65;

export const Simulator = ({ onAgenda }) => {
  const [monthly, setMonthly] = useState(5000);
  const [age, setAge] = useState(35);
  const [profile, setProfile] = useState(RISK_PROFILES[1]);

  const years = Math.max(RETIREMENT_AGE - age, 1);

  const projection = useMemo(() => {
    const rm = profile.rate / 100 / 12;
    const rows = [];
    for (let y = 1; y <= years; y++) {
      const m = y * 12;
      const balance = monthly * ((Math.pow(1 + rm, m) - 1) / rm);
      rows.push({ year: y, age: age + y, contributed: monthly * m, balance });
    }
    return rows;
  }, [monthly, age, profile, years]);

  const final = projection[projection.length - 1];

  const loadLogo = () =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext("2d").drawImage(img, 0, 0);
        resolve({ dataUrl: canvas.toDataURL("image/png"), ratio: img.naturalWidth / img.naturalHeight });
      };
      img.onerror = () => resolve(null);
      img.src = "/logos/ximnanzas.png";
    });

  const downloadPDF = async () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const logo = await loadLogo();
    let textX = 14;
    if (logo) {
      const logoHeight = 22;
      const logoWidth = logoHeight * logo.ratio;
      doc.addImage(logo.dataUrl, "PNG", 14, 8, logoWidth, logoHeight);
      textX = 14 + logoWidth + 6;
    } else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(61, 26, 78);
      doc.text("XIMNANZAS", 14, 20);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(10, 10, 10);
    doc.text("Proyección de tu Plan Personal de Retiro · Allianz", textX, 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(82, 82, 82);
    doc.text(
      `Aportación mensual: ${fmtMXN(monthly)}   ·   Edad actual: ${age} años   ·   Perfil: ${profile.label} (${profile.rate}% anual)   ·   Retiro a los ${RETIREMENT_AGE} años`,
      textX,
      26
    );
    autoTable(doc, {
      startY: 40,
      head: [["Año", "Edad", "Aportado acumulado", "Saldo proyectado"]],
      body: projection.map((r) => [r.year, r.age, fmtMXN(r.contributed), fmtMXN(r.balance)]),
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [61, 26, 78], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 247, 252] },
    });
    const ph = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text(
      `XIMNANZAS · Asesor independiente Allianz. Proyección ilustrativa generada el ${new Date().toLocaleDateString("es-MX")}; los rendimientos reales pueden variar.`,
      14,
      ph - 10
    );
    doc.save("proyeccion-retiro-ximnanzas.pdf");
  };

  return (
    <section id="simulador" data-testid="simulator-section" className="bg-[#1E1E2E] py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Simulador interactivo</p>
          <h2 className="max-w-2xl font-serif text-4xl font-light tracking-tighter md:text-5xl">
            Descubre cuánto puede valer tu constancia.
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="mb-12">
              <div className="mb-4 flex items-baseline justify-between">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  Aportación mensual
                </label>
                <span data-testid="monthly-value" className="font-serif text-3xl font-light">
                  {fmtMXN(monthly)}
                </span>
              </div>
              <Slider
                data-testid="monthly-slider"
                value={[monthly]}
                onValueChange={([v]) => setMonthly(v)}
                min={1000}
                max={50000}
                step={500}
                className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-white [&_[role=slider]]:bg-white"
              />
              <div className="mt-2 flex justify-between text-[11px] text-white/40">
                <span>$1,000</span>
                <span>$50,000</span>
              </div>
            </div>

            <div className="mb-12">
              <div className="mb-4 flex items-baseline justify-between">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/70">Edad actual</label>
                <span data-testid="age-value" className="font-serif text-3xl font-light">
                  {age} años
                </span>
              </div>
              <Slider
                data-testid="age-slider"
                value={[age]}
                onValueChange={([v]) => setAge(v)}
                min={18}
                max={64}
                step={1}
                className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-white [&_[role=slider]]:bg-white"
              />
              <div className="mt-2 flex justify-between text-[11px] text-white/40">
                <span>18</span>
                <span>64</span>
              </div>
            </div>
   
         <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">Perfil de Inversionista</p>
            <div className="grid grid-cols-3 gap-2" data-testid="risk-profile-chips">
              {RISK_PROFILES.map((p) => (
                <button
                  key={p.id}
                  data-testid={`risk-chip-${p.id}`}
                  onClick={() => setProfile(p)}
                  className={`border px-3 py-4 text-left transition-colors ${
                    profile.id === p.id
                      ? "border-white bg-white text-[#1E1E2E]"
                      : "border-white/25 text-white/80 hover:border-white hover:text-white"
                  }`}
                >
                  <span className="block text-sm font-semibold">{p.label}</span>
                  <span className="mt-1 block font-serif text-2xl font-light">{p.rate}%</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs font-light text-white/50">{profile.desc}</p>

            <div className="relative mt-12 hidden overflow-hidden lg:block">
              <img src={IMAGES.finance} alt="Crecimiento financiero" className="aspect-[16/9] w-full object-cover opacity-80" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-2">
              <div className="bg-[#1E1E2E] p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Saldo proyectado a los {RETIREMENT_AGE}
                </p>
                <p data-testid="projected-balance" className="mt-3 font-serif text-4xl font-light tracking-tight md:text-5xl">
                  {fmtMXN(final.balance)}
                </p>
              </div>
              <div className="bg-[#1E1E2E] p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Total aportado</p>
                <p data-testid="total-contributed" className="mt-3 font-serif text-4xl font-light tracking-tight text-white/70 md:text-5xl">
                  {fmtMXN(final.contributed)}
                </p>
              </div>
            </div>

            <div className="mt-10 border border-white/15 p-6" data-testid="projection-chart">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Crecimiento proyectado
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projection} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                    <defs>
                      <linearGradient id="saldoGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis
                      dataKey="age"
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      width={56}
                      tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip
                      formatter={(v) => fmtMXN(v)}
                      labelFormatter={(a) => `Edad ${a} años`}
                      contentStyle={{ background: "#3D1A4E", border: "none", fontSize: 12 }}
                      itemStyle={{ color: "#fff" }}
                      labelStyle={{ color: "rgba(255,255,255,0.65)" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      name="Saldo proyectado"
                      stroke="#ffffff"
                      strokeWidth={2}
                      fill="url(#saldoGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="contributed"
                      name="Aportado acumulado"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fill="transparent"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-10 max-h-80 overflow-y-auto border border-white/15" data-testid="projection-table-wrapper">
              <Table>
                <TableHeader className="sticky top-0 bg-[#3D1A4E]">
                  <TableRow className="border-white/15 hover:bg-transparent">
                    <TableHead className="text-white/80">Año</TableHead>
                    <TableHead className="text-white/80">Edad</TableHead>
                    <TableHead className="text-white/80">Aportado acumulado</TableHead>
                    <TableHead className="text-right text-white/80">Saldo proyectado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projection.map((r) => (
                    <TableRow key={r.year} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-white/80">{r.year}</TableCell>
                      <TableCell className="text-white/80">{r.age}</TableCell>
                      <TableCell className="text-white/80">{fmtMXN(r.contributed)}</TableCell>
                      <TableCell className="text-right font-medium text-white">{fmtMXN(r.balance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                data-testid="download-pdf-button"
                onClick={downloadPDF}
                className="group inline-flex items-center gap-3 bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#1E1E2E] transition-colors hover:bg-white/85"
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                Descargar mi proyección
              </button>
              <button
                data-testid="simulator-agenda-button"
                onClick={onAgenda}
                className="inline-flex items-center gap-3 border border-white/40 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-[#1E1E2E]"
              >
                <CalendarDays className="h-4 w-4" />
                Agenda una cita
              </button>
            </div>

            <div className="mt-16 border-t border-white/15 pt-10" data-testid="services-legend">
              <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                También te acompañamos en
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {PRODUCT_LIST.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/${p.slug}`}
                    data-testid={`legend-link-${p.slug}`}
                    className="group flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white transition-colors group-hover:text-white/80">
                        {p.title}
                      </p>
                      <p className="mt-1 text-xs font-light leading-relaxed text-white/50">{p.tagline}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
