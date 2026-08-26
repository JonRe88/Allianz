import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Empecé mi PPR a los 32 con aportaciones pequeñas. Hoy, ver mi proyección de retiro me da una paz que no tiene precio.",
    name: "Mariana G.",
    role: "Arquitecta, 38 años · CDMX",
  },
  {
    quote:
      "La deducción de impuestos fue lo que me convenció. Cada abril el SAT me devuelve dinero por ahorrar para mí.",
    name: "Ricardo T.",
    role: "Ingeniero, 45 años · Monterrey",
  },
  {
    quote:
      "Mi asesor Allianz me explicó todo sin letras chiquitas. Por fin siento que mi futuro está en mis manos.",
    name: "Paola R.",
    role: "Emprendedora, 35 años · Guadalajara",
  },
];

export const Testimonials = () => (
  <section data-testid="testimonials-section" className="border-t border-black/10 bg-[#FAF7F2] py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#3D1A4E]">Historias reales</p>
        <h2 className="font-serif text-4xl font-light tracking-tighter text-[#0A0A0A] md:text-6xl">
          Ellos ya empezaron <em className="font-normal text-[#B8850A]">su hoy.</em>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 gap-px border border-black/10 bg-black/10 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="flex h-full flex-col bg-white p-10 transition-colors duration-500 hover:bg-[#3D1A4E] lg:p-12"
            data-testid={`testimonial-${i}`}
          >
            <span className="font-serif text-6xl font-light leading-none text-[#3D1A4E]/20" aria-hidden="true">
              “
            </span>
            <blockquote className="mt-4 flex-1 font-serif text-lg font-light leading-relaxed tracking-tight text-[#0A0A0A] transition-colors duration-500 md:text-xl">
              {t.quote}
            </blockquote>
            <figcaption className="mt-10 border-t border-black/10 pt-6">
              <p className="text-sm font-semibold text-[#3D1A4E]">{t.name}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-neutral-500">{t.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);
