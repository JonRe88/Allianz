import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PRODUCT_LIST } from "@/data/products";

export const ServicesGrid = () => (
  <section id="servicios" data-testid="services-section" className="bg-[#FAF7F2] py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
      >
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#3D1A4E]">Otros servicios</p>
          <h2 className="max-w-xl font-serif text-4xl font-light tracking-tighter text-[#0A0A0A] md:text-5xl">
            Un ecosistema completo para tu patrimonio.
          </h2>
        </div>
        <p className="max-w-sm text-sm font-light leading-relaxed text-neutral-600">
          Más allá del retiro, te acompaño en cada frente de tu vida financiera con el respaldo de Allianz.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 gap-px border border-black/10 bg-black/10 md:grid-cols-2">
        {PRODUCT_LIST.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <Link
              to={`/${p.slug}`}
              data-testid={`service-card-${p.slug}`}
              className="group relative flex h-full flex-col justify-between overflow-hidden bg-white p-10 transition-colors duration-500 hover:bg-[#3D1A4E] lg:p-14"
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-5xl font-light text-[#3D1A4E]/15 transition-colors duration-500 group-hover:text-white/25">
                  {p.chapter}
                </span>
                <ArrowUpRight className="h-6 w-6 text-[#3D1A4E] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
              </div>
              <div className="mt-16">
                <h3 className="font-serif text-2xl font-normal tracking-tight text-[#0A0A0A] transition-colors duration-500 group-hover:text-white md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-neutral-600 transition-colors duration-500 group-hover:text-white/70">
                  {p.tagline}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
