import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = ({ onAgenda }) => (
  <header
    data-testid="site-header"
    className="fixed top-0 left-0 right-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl"
  >
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
      <Link to="/" data-testid="header-logo-link" className="group flex items-center gap-3">
        <img
          src="/logos/ximnanzas.png"
          alt="XIMNANZAS"
          data-testid="header-logo"
          className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="hidden border-l border-black/10 pl-3 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 sm:inline">
          Asesor Allianz
        </span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-600 md:flex">
        <Link data-testid="nav-simulator-link" to="/#simulador" className="transition-colors hover:text-[#003781]">
          Simulador
        </Link>
        <Link data-testid="nav-benefits-link" to="/#beneficios" className="transition-colors hover:text-[#003781]">
          Beneficios
        </Link>
        <Link data-testid="nav-services-link" to="/#servicios" className="transition-colors hover:text-[#003781]">
          Servicios
        </Link>
        <Link data-testid="nav-contact-link" to="/#contacto" className="transition-colors hover:text-[#003781]">
          Contacto
        </Link>
      </nav>
      <Button
        data-testid="header-agenda-button"
        onClick={onAgenda}
        className="rounded-none bg-[#003781] px-5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#00255A]"
      >
        Agenda una cita
      </Button>
    </div>
  </header>
);
