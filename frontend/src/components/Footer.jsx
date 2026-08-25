import { Link } from "react-router-dom";
import { PRODUCT_LIST } from "@/data/products";

export const Footer = () => (
  <footer data-testid="site-footer" className="bg-[#0A0A0A] py-16 text-white">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl font-bold tracking-tight">XIMNANZAS</p>
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-white/50">
            Asesor independiente Allianz en México. Estrategias de retiro, protección e inversión con respaldo
            internacional.
          </p>
        </div>
        <div className="md:col-span-4">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Servicios</p>
          <ul className="space-y-2 text-sm font-light text-white/70">
            <li>
              <Link data-testid="footer-ppr-link" to="/#simulador" className="transition-colors hover:text-white">
                Plan Personal de Retiro
              </Link>
            </li>
            {PRODUCT_LIST.map((p) => (
              <li key={p.slug}>
                <Link data-testid={`footer-link-${p.slug}`} to={`/${p.slug}`} className="transition-colors hover:text-white">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Contacto</p>
          <p className="text-sm font-light text-white/70">ximenalalith.allianzmlp@gmail.com</p>
          <Link
            data-testid="footer-admin-link"
            to="/prospectos"
            className="mt-8 inline-block text-[11px] uppercase tracking-widest text-white/30 transition-colors hover:text-white/70"
          >
            Acceso asesores
          </Link>
        </div>
      </div>
      <div className="mt-16 border-t border-white/10 pt-8">
        <p className="text-xs font-light leading-relaxed text-white/35">
          XIMNANZAS es una marca de asesoría independiente. Allianz es marca registrada de Allianz SE; los productos
          mencionados son operados por Allianz México S.A. Las proyecciones del simulador son ilustrativas y no
          garantizan rendimientos.
        </p>
        <p className="mt-4 text-xs text-white/35">© {new Date().getFullYear()} XIMNANZAS. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);
