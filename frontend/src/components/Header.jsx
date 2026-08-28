import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { id: "nav-simulator-link", to: "/#simulador", label: "Simulador" },
  { id: "nav-benefits-link", to: "/#beneficios", label: "Beneficios" },
  { id: "nav-services-link", to: "/#servicios", label: "Servicios" },
  { id: "nav-contact-link", to: "/#contacto", label: "Contacto" },
];

export const Header = ({ onAgenda, transparentTop = false }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparentTop) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentTop]);

  const solid = !transparentTop || scrolled;

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-40 border-b transition-[background-color,border-color,backdrop-filter,color] duration-500 ${
        solid
          ? "border-black/5 bg-white/85 text-[#3D1A4E] backdrop-blur-xl"
          : "border-transparent bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" data-testid="header-logo-link" className="group flex items-center gap-3">
          <img
            src="/logos/ximnanzas.png"
            alt="XIMNANZAS"
            data-testid="header-logo"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className={`hidden border-l pl-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 sm:inline ${
              solid ? "border-black/10 text-neutral-500" : "border-white/30 text-white/70"
            }`}
          >
            Asesor Allianz
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.id}
              data-testid={l.id}
              to={l.to}
              className={`transition-opacity duration-300 ${
                solid ? "text-neutral-600 hover:text-[#3D1A4E]" : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button
            data-testid="header-agenda-button"
            onClick={onAgenda}
            className={`group inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
              solid
                ? "bg-[#3D1A4E] text-white hover:bg-[#6B3F8A]"
                : "bg-white text-[#3D1A4E] hover:bg-brand-gold hover:text-white"
            }`}
          >
            Agenda una cita
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </nav>

        <button
          data-testid="header-agenda-button-mobile"
          onClick={onAgenda}
          className={`inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 md:hidden ${
            solid ? "bg-[#3D1A4E] text-white" : "bg-white text-[#3D1A4E]"
          }`}
        >
          Agenda
        </button>
      </div>
    </header>
  );
};