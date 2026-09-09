import { ExternalLink } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]" data-testid="admin-page">
      <header className="border-b border-black/10 bg-[#3D1A4E] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-xl font-bold tracking-tight">XIMNANZAS</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">Administración</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-light tracking-tight text-[#3D1A4E] md:text-5xl">
            Panel de administración
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg font-light leading-relaxed text-neutral-600">
            La gestión de prospectos y citas ahora se realiza directamente desde el
            dashboard de <strong>Formspree</strong>. Ya no se requiere autenticación en esta
            aplicación.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <a
              href="https://formspree.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-8 border border-black/10 bg-white rounded-2xl transition-colors hover:border-[#3D1A4E] hover:bg-[#FAF7F2]"
              data-testid="formspree-dashboard-link"
            >
              <ExternalLink className="h-10 w-10 text-[#3D1A4E] group-hover:scale-110 transition-transform" />
              <span className="mt-4 font-semibold text-[#3D1A4E]">Dashboard de Formspree</span>
              <span className="mt-1 text-sm font-light text-neutral-500">Ver todos los envíos de formularios</span>
            </a>

            <a
              href="https://formspree.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-8 border border-black/10 bg-white rounded-2xl transition-colors hover:border-[#3D1A4E] hover:bg-[#FAF7F2]"
              data-testid="formspree-settings-link"
            >
              <ExternalLink className="h-10 w-10 text-[#3D1A4E] group-hover:scale-110 transition-transform" />
              <span className="mt-4 font-semibold text-[#3D1A4E]">Configuración de formularios</span>
              <span className="mt-1 text-sm font-light text-neutral-500">Gestionar notificaciones y spam</span>
            </a>
          </div>

          <div className="mt-12 p-6 border border-black/10 bg-white rounded-2xl">
            <h2 className="font-serif text-xl font-normal text-[#3D1A4E]">¿Qué cambió?</h2>
            <ul className="mt-4 space-y-3 text-left text-sm font-light text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-[#3D1A4E]">✓</span>
                Los formularios envían directamente a Formspree (sin backend propio)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3D1A4E]">✓</span>
                Las notificaciones de email se configuran en Formspree
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3D1A4E]">✓</span>
                Exportación CSV disponible en el dashboard de Formspree
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3D1A4E]">✓</span>
                Protección anti-spam integrada
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}