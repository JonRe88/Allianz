import { useEffect, useState } from "react";
import { Download, Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";

const toCSV = (rows) =>
  rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");

const downloadCSV = (filename, csv) => {
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState("leads");

  useEffect(() => {
    api
      .get("/auth/me")
      .then(({ data }) => setUser(data))
      .catch(() => setUser(false))
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (!user) return;
    api.get("/leads").then(({ data }) => setLeads(data)).catch(() => {});
    api.get("/appointments").then(({ data }) => setAppointments(data)).catch(() => {});
  }, [user]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setUser(data);
    } catch (err) {
      const d = err.response?.data?.detail;
      setError(typeof d === "string" ? d : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await api.post("/auth/logout").catch(() => {});
    setUser(false);
    toast.success("Sesión cerrada");
  };

  const exportLeads = () => {
    const rows = [["Nombre", "Email", "Teléfono", "Interés", "Mensaje", "Fecha"]];
    leads.forEach((l) => rows.push([l.name, l.email, l.phone, l.interest, l.message, l.created_at]));
    downloadCSV("prospectos-ximnanzas.csv", toCSV(rows));
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA]" data-testid="admin-loading">
        <Loader2 className="h-6 w-6 animate-spin text-[#003781]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#00255A] px-6" data-testid="admin-login-page">
        <form onSubmit={login} className="w-full max-w-sm bg-white p-10" data-testid="admin-login-form">
          <p className="font-serif text-2xl font-bold tracking-tight text-[#003781]">XIMNANZAS</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-neutral-500">Panel de prospectos</p>
          <div className="mt-8 grid gap-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              data-testid="admin-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-none"
              autoComplete="username"
            />
          </div>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="admin-password">Contraseña</Label>
            <Input
              id="admin-password"
              type="password"
              data-testid="admin-password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-none"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p data-testid="admin-login-error" className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}
          <Button
            data-testid="admin-login-button"
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-none bg-[#003781] py-5 text-xs font-semibold uppercase tracking-widest hover:bg-[#00255A]"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]" data-testid="admin-dashboard">
      <header className="border-b border-black/10 bg-[#003781] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl font-bold tracking-tight">XIMNANZAS</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">Prospectos</span>
          </div>
          <button
            data-testid="admin-logout-button"
            onClick={logout}
            className="inline-flex items-center gap-2 border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-white hover:text-[#003781]"
          >
            <LogOut className="h-3.5 w-3.5" />
            Salir
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid grid-cols-2 gap-px border border-black/10 bg-black/10 sm:grid-cols-4">
          <div className="bg-white p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">Prospectos</p>
            <p data-testid="leads-count" className="mt-2 font-serif text-4xl font-light text-[#003781]">{leads.length}</p>
          </div>
          <div className="bg-white p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">Citas</p>
            <p data-testid="appointments-count" className="mt-2 font-serif text-4xl font-light text-[#003781]">
              {appointments.length}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              data-testid="tab-leads-button"
              onClick={() => setTab("leads")}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                tab === "leads" ? "bg-[#003781] text-white" : "border border-black/15 text-neutral-600 hover:border-[#003781]"
              }`}
            >
              Prospectos
            </button>
            <button
              data-testid="tab-appointments-button"
              onClick={() => setTab("appointments")}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                tab === "appointments"
                  ? "bg-[#003781] text-white"
                  : "border border-black/15 text-neutral-600 hover:border-[#003781]"
              }`}
            >
              Citas
            </button>
          </div>
          {tab === "leads" && (
            <Button
              data-testid="export-csv-button"
              onClick={exportLeads}
              variant="outline"
              className="rounded-none border-[#003781] text-xs font-semibold uppercase tracking-widest text-[#003781] hover:bg-[#003781] hover:text-white"
            >
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
          )}
        </div>

        <div className="mt-6 overflow-x-auto border border-black/10 bg-white" data-testid="admin-table-wrapper">
          {tab === "leads" ? (
            <Table data-testid="leads-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Interés</TableHead>
                  <TableHead>Mensaje</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-sm text-neutral-500" data-testid="leads-empty">
                      Aún no hay prospectos.
                    </TableCell>
                  </TableRow>
                )}
                {leads.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium">{l.name}</TableCell>
                    <TableCell>{l.email}</TableCell>
                    <TableCell>{l.phone}</TableCell>
                    <TableCell>{l.interest}</TableCell>
                    <TableCell className="max-w-56 truncate">{l.message || "—"}</TableCell>
                    <TableCell className="whitespace-nowrap text-neutral-500">
                      {l.created_at ? new Date(l.created_at).toLocaleString("es-MX") : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table data-testid="appointments-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Registrada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-sm text-neutral-500" data-testid="appointments-empty">
                      Aún no hay citas agendadas.
                    </TableCell>
                  </TableRow>
                )}
                {appointments.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.name}</TableCell>
                    <TableCell>{a.phone}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>{a.time}</TableCell>
                    <TableCell className="whitespace-nowrap text-neutral-500">
                      {a.created_at ? new Date(a.created_at).toLocaleString("es-MX") : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
}
