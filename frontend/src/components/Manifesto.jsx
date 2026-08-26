import { motion } from "framer-motion";

const CHAPTERS = [
  {
    n: "01",
    title: "Deducibilidad fiscal",
    body: "Tu aportación al PPR es deducible hasta el 10% de tu ingreso anual (Art. 151 LISR). Cada peso que ahorras, el SAT te devuelve una parte.",
  },
  {
    n: "02",
    title: "Rendimiento compuesto",
    body: "El tiempo es tu mayor aliado. Con tasas del 6 al 10% anual según tu perfil, el interés compuesto multiplica tu esfuerzo año tras año.",
  },
  {
    n: "03",
    title: "Respaldo Allianz",
    body: "Más de 130 años de historia y presencia en 70 países. Tu retiro no queda en manos de una promesa: queda en manos de una institución.",
  },
  {
    n: "04",
    title: "Flexibilidad total",
    body: "Aportaciones mensuales desde montos accesibles, ajustables a tu etapa de vida. Tú decides cuánto, cuándo y con qué perfil de riesgo.",
  },
];

export const Manifesto = () => (
  <section id="beneficios" data-testid="manifesto-section" className="bg-[#FAF7F2] py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#3D1A4E]"
      >
        Manifiesto
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-20 max-w-2xl font-serif text-4xl font-light tracking-tighter text-[#0A0A0A] md:text-5xl"
      >
        Cuatro razones por las que tu futuro merece un plan, no un deseo.
      </motion.h2>
      <div>
        {CHAPTERS.map((c, i) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="group grid grid-cols-1 gap-6 border-t border-black/10 py-12 transition-colors last:border-b hover:bg-white md:grid-cols-12 md:gap-10 md:py-16"
            data-testid={`manifesto-chapter-${c.n}`}
          >
            <div className="md:col-span-4">
              <span className="font-serif text-6xl font-light text-[#3D1A4E]/20 transition-colors duration-500 group-hover:text-[#3D1A4E] md:text-8xl">
                {c.n}
              </span>
            </div>
            <div className="md:col-span-8">
              <h3 className="font-serif text-2xl font-normal tracking-tight text-[#0A0A0A] md:text-3xl">
                {c.title}
              </h3>
              <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-neutral-600">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
