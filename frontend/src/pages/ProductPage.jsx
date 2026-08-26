import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, MessageCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { MaskedLine } from "@/components/MaskedLine";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { PRODUCT_LIST, WHATSAPP_URL } from "@/data/products";

export default function ProductPage({ product }) {
  const [agendaOpen, setAgendaOpen] = useState(false);
  const others = PRODUCT_LIST.filter((p) => p.slug !== product.slug);

  return (
    <div data-testid={`product-page-${product.slug}`}>
      <Header onAgenda={() => setAgendaOpen(true)} />
      <main>
        <section className="grain relative overflow-hidden bg-[#FAFAFA] pt-32 lg:pt-40">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pb-24 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Link
                  to="/"
                  data-testid="product-back-link"
                  className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 transition-colors hover:text-[#3D1A4E]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver al inicio
                </Link>
              </motion.div>
              <h1 className="font-serif text-5xl font-light leading-[1.05] tracking-tighter text-[#0A0A0A] md:text-7xl">
                <MaskedLine delay={0.1}>{product.title}</MaskedLine>
                <MaskedLine delay={0.25}>
                  <em className="text-2xl font-normal not-italic text-[#3D1A4E] md:text-4xl">{product.tagline}</em>
                </MaskedLine>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="mt-10 max-w-lg text-base font-light leading-relaxed text-neutral-600 md:text-lg"
              >
                {product.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="mt-12 flex flex-wrap gap-4"
              >
                <a
                  data-testid="product-whatsapp-button"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#3D1A4E] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#6B3F8A]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp directo
                </a>
                <button
                  data-testid="product-agenda-button"
                  onClick={() => setAgendaOpen(true)}
                  className="inline-flex items-center gap-3 border border-[#3D1A4E]/30 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#3D1A4E] transition-colors hover:border-[#3D1A4E] hover:bg-[#3D1A4E] hover:text-white"
                >
                  <CalendarDays className="h-4 w-4" />
                  Hablar con un asesor
                </button>
              </motion.div>
            </div>
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="absolute -right-6 -top-6 h-full w-full bg-[#3D1A4E]" aria-hidden="true" />
                <img
                  src={product.image}
                  alt={product.title}
                  data-testid="product-image"
                  className="relative aspect-[4/5] w-full object-cover"
                />
                <span className="absolute -bottom-6 right-6 bg-white px-6 py-4 font-serif text-5xl font-light text-[#3D1A4E]/25 shadow-lg">
                  {product.chapter}
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        <Marquee />

        <section className="bg-white py-24 lg:py-32" data-testid="product-benefits-section">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="mb-16 max-w-xl font-serif text-4xl font-light tracking-tighter text-[#0A0A0A] md:text-5xl"
            >
              Lo que incluye.
            </motion.h2>
            <div className="grid grid-cols-1 gap-px border border-black/10 bg-black/10 md:grid-cols-2">
              {product.benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="flex items-start gap-4 bg-white p-8"
                  data-testid={`product-benefit-${i}`}
                >
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center bg-[#3D1A4E]">
                    <Check className="h-4 w-4 text-white" />
                  </span>
                  <p className="text-base font-light leading-relaxed text-neutral-700">{b}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-black/10 bg-[#FAFAFA] py-24" data-testid="product-others-section">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="mb-10 text-xs font-semibold uppercase tracking-[0.3em] text-[#3D1A4E]">
              Explora también
            </p>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to={`/${p.slug}`}
                  data-testid={`other-service-${p.slug}`}
                  className="group flex items-center justify-between py-8 transition-colors"
                >
                  <span className="font-serif text-2xl font-light tracking-tight text-[#0A0A0A] transition-colors group-hover:text-[#3D1A4E] md:text-4xl">
                    {p.title}
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-neutral-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#3D1A4E]" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AppointmentDialog open={agendaOpen} onOpenChange={setAgendaOpen} />
    </div>
  );
}
