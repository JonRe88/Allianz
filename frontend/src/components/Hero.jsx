import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, CalendarDays } from "lucide-react";
import { MaskedLine } from "@/components/MaskedLine";
import { IMAGES } from "@/data/products";

export const Hero = ({ onAgenda }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <section ref={ref} data-testid="hero-section" className="grain relative overflow-hidden bg-[#FAFAFA] pt-32 lg:pt-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pb-24 lg:grid-cols-12 lg:px-10 lg:pb-32">
        <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#003781]"
            data-testid="hero-eyebrow"
          >
            Plan Personal de Retiro · Allianz México
          </motion.p>
          <h1 className="font-serif text-5xl font-light leading-[1.02] tracking-tighter text-[#0A0A0A] sm:text-6xl lg:text-7xl xl:text-8xl">
            <MaskedLine delay={0.1}>Tu retiro,</MaskedLine>
            <MaskedLine delay={0.25}>
              <em className="font-normal text-[#003781]">diseñado</em> con
            </MaskedLine>
            <MaskedLine delay={0.4}>precisión.</MaskedLine>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-10 max-w-md text-base font-light leading-relaxed text-neutral-600 md:text-lg"
          >
            Ahorra con deducibilidad fiscal, rendimientos competitivos y el respaldo de una de las
            aseguradoras más grandes del mundo. Tu futuro empieza con una simulación de 30 segundos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <a
              data-testid="hero-simulate-button"
              href="#simulador"
              className="group inline-flex items-center gap-3 bg-[#003781] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#00255A]"
            >
              Simula tu retiro
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
            <button
              data-testid="hero-agenda-button"
              onClick={onAgenda}
              className="group inline-flex items-center gap-3 border border-[#003781]/30 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#003781] transition-colors hover:border-[#003781] hover:bg-[#003781] hover:text-white"
            >
              <CalendarDays className="h-4 w-4" />
              Agenda una cita
            </button>
          </motion.div>
        </motion.div>
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -left-6 -top-6 h-full w-full bg-[#003781]" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.img
                style={{ y: imgY }}
                src={IMAGES.advisor}
                alt="Asesor financiero profesional"
                data-testid="hero-image"
                className="h-[115%] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 hidden bg-white px-8 py-6 shadow-xl lg:block">
              <p className="font-serif text-4xl font-bold text-[#003781]">10%</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                de tu ingreso anual, deducible
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
