import { motion } from "framer-motion";
import { IMAGES } from "@/data/products";

const TESTIMONIALS = [
  {
    quote:
      "Llevaba años posponiendo mi retiro. En una sola sesión entendí cuánto necesitaba aportar y hoy veo crecer mi plan cada mes.",
    name: "Mariana G.",
    role: "Directora de marketing, CDMX",
  },
  {
    quote:
      "La deducibilidad fue lo que me convenció: ahorro para mi retiro y pago menos impuestos. La asesoría fue clara y sin presión.",
    name: "Rodrigo T.",
    role: "Arquitecto independiente, Guadalajara",
  },
  {
    quote:
      "Migré mi ahorro de una cuenta sin rendimiento a un PPR Balanceado. La diferencia proyectada a 20 años me dejó sin palabras.",
    name: "Alejandra M.",
    role: "Médica, Monterrey",
  },
];

export const Testimonials = () => (
  <section data-testid="testimonials-section" className="border-t border-black/10 bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#003781]">Testimonios</p>
          <h2 className="font-serif text-4xl font-light tracking-tighter text-[#0A0A0A] md:text-5xl">
            Historias que ya empezaron.
          </h2>
          <div className="relative mt-12 hidden overflow-hidden lg:block">
            <div className="absolute -left-4 -top-4 h-full w-full bg-[#003781]/10" aria-hidden="true" />
            <img
              src={IMAGES.retirement}
              alt="Pareja disfrutando su retiro"
              data-testid="testimonials-image"
              className="relative aspect-[4/3] w-full object-cover"
            />
          </div>
        </motion.div>
        <div className="lg:col-span-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border-t border-black/10 py-10 first:border-t-0 first:pt-0 md:py-12"
              data-testid={`testimonial-${i}`}
            >
              <p className="max-w-2xl font-serif text-xl font-light italic leading-relaxed tracking-tight text-[#0A0A0A] md:text-2xl">
                “{t.quote}”
              </p>
              <footer className="mt-6">
                <p className="text-sm font-semibold text-[#003781]">{t.name}</p>
                <p className="text-xs uppercase tracking-widest text-neutral-500">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </div>
  </section>
);
