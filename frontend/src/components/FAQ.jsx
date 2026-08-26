import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WHATSAPP_URL } from "@/data/products";

const FAQS = [
  {
    q: "¿Cómo deduzco impuestos con mi PPR?",
    a: "Tus aportaciones son deducibles hasta el 10% de tus ingresos anuales (tope de 5 UMAs), según el Artículo 151 de la LISR. Allianz te emite la constancia de aportaciones para presentarla en tu declaración anual y el SAT te devuelve parte de lo ahorrado.",
  },
  {
    q: "¿Cuándo puedo retirar mi dinero?",
    a: "El plan está diseñado para retirarse a los 65 años, momento en el que recibes tu saldo con beneficios fiscales. Si necesitas retirar antes, es posible, pero aplica una retención de impuestos sobre lo retirado.",
  },
  {
    q: "¿Qué pasa con mi dinero si yo llego a faltar?",
    a: "El saldo acumulado se entrega directamente a los beneficiarios que designaste, sin pasar por juicio sucesorio. Tu familia recibe el fruto de tu ahorro de forma ágil y protegida.",
  },
  {
    q: "¿Puedo cambiar cuánto aporto cada mes?",
    a: "Sí. Puedes aumentar, disminuir o pausar tu aportación mensual según tu momento de vida, sin penalizaciones. Tu plan se adapta a ti, no al revés.",
  },
  {
    q: "¿Qué pasa si dejo de aportar?",
    a: "No pierdes nada: lo acumulado se mantiene invertido y sigue generando rendimientos. Puedes reanudar tus aportaciones cuando quieras.",
  },
  {
    q: "¿Quién regula y respalda mi plan?",
    a: "Tu plan es operado por Allianz México y regulado por la CNSF (Comisión Nacional de Seguros y Fianzas). XIMNANZAS es distribuidor autorizado y te acompaña personalmente en todo el proceso.",
  },
];

export const FAQ = () => (
  <section id="preguntas" data-testid="faq-section" className="border-t border-black/10 bg-[#FAF7F2] py-24 lg:py-32">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-5"
      >
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#3D1A4E]">Preguntas frecuentes</p>
        <h2 className="font-serif text-4xl font-light tracking-tighter text-[#0A0A0A] md:text-5xl">
          Todo claro, <em className="font-normal text-[#B8850A]">sin letras chiquitas.</em>
        </h2>
        <p className="mt-8 max-w-sm text-base font-light leading-relaxed text-neutral-600">
          Deducibilidad, retiros, beneficiarios y respaldo: las dudas más comunes de quienes empiezan su Plan
          Personal de Retiro.
        </p>
        <a
          data-testid="faq-whatsapp-link"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 border border-[#3D1A4E]/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#3D1A4E] transition-colors hover:border-[#3D1A4E] hover:bg-[#3D1A4E] hover:text-white"
        >
          <MessageCircle className="h-4 w-4" />
          ¿Otra duda? Pregúntanos por WhatsApp
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="lg:col-span-7"
      >
        <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-black/10" data-testid={`faq-item-${i}`}>
              <AccordionTrigger
                data-testid={`faq-trigger-${i}`}
                className="py-6 text-left font-serif text-lg font-normal tracking-tight text-[#0A0A0A] transition-colors hover:text-[#3D1A4E] hover:no-underline md:text-xl"
              >
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base font-light leading-relaxed text-neutral-600">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);
