import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MousePointer2 } from "lucide-react";

const HERO_IMG =
  "https://images.pexels.com/photos/36729964/pexels-photo-36729964.jpeg?auto=compress&cs=tinysrgb&w=1920";

const scrollToSection = (hash) => {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
};

const MaskedLine = ({ children, delay = 0 }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block will-change-transform"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      data-testid="hero-section"
      className="noise-overlay relative flex min-h-screen items-end overflow-hidden bg-brand-charcoal"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-[10%] h-[120%]">
        <img
          src={HERO_IMG}
          alt="Pareja planeando su futuro financiero"
          data-testid="hero-image"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/70 to-brand-charcoal/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/80 via-transparent to-transparent" />

      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2 }}
        className="text-stroke-gold absolute right-10 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[11rem] leading-none lg:block"
      >
        PPR
      </motion.span>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="overline-label mb-8 text-brand-sageLight"
          data-testid="hero-overline"
        >
          Plan Personal de Retiro Allianz · Asesoría XIMNANZAS
        </motion.p>
        <h1
          className="font-serif text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
          data-testid="hero-heading"
        >
          <MaskedLine delay={0.35}>Tu retiro</MaskedLine>
          <MaskedLine delay={0.5}>
            <em className="font-serif italic text-brand-sageLight">empieza</em>
          </MaskedLine>
          <MaskedLine delay={0.65}>hoy.</MaskedLine>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-brand-sageLight/90 md:text-lg"
        >
          Un Plan Personal de Retiro que crece con interés compuesto, deduce impuestos desde el
          primer día y te da la libertad de vivir mañana como lo sueñas hoy.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            data-testid="hero-cta-calculator"
            onClick={() => scrollToSection("#simulador")}
            className="group inline-flex items-center gap-2 bg-brand-gold px-8 py-4 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-[#9A7008]"
          >
            Calcula tu retiro
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            data-testid="hero-cta-advisor"
            onClick={() => scrollToSection("#contacto")}
            className="inline-flex items-center gap-2 border border-white/40 px-8 py-4 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:border-white/70 hover:bg-white/10"
          >
            Hablar con un asesor
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 flex flex-wrap gap-x-12 gap-y-6 text-white"
          data-testid="hero-stats"
        >
          {[
            ["+130", "años de respaldo global"],
            ["Art. 151", "deducible ante el SAT"],
            ["100%", "a tu nombre, siempre"],
          ].map(([big, small]) => (
            <div key={small} className="border-l border-brand-sageLight/30 pl-4">
              <p className="font-serif text-3xl font-bold">{big}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-sageLight/80">{small}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-6 z-10 text-brand-sageLight/70 lg:right-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <MousePointer2 className="h-5 w-5 rotate-[135deg]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
