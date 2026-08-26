import { Asterisk } from "lucide-react";

const ITEMS = [
  "Plan Personal de Retiro",
  "Deducible de impuestos",
  "Respaldo Allianz",
  "Rendimiento compuesto",
  "Tu legado, protegido",
  "Libertad financiera",
];

export const Marquee = () => (
  <div data-testid="editorial-marquee" className="overflow-hidden border-y border-black/10 bg-white py-8">
    <div className="animate-marquee-slow flex w-max items-center">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {ITEMS.map((item) => (
            <span key={`${copy}-${item}`} className="flex items-center">
              <span className="whitespace-nowrap px-10 font-serif text-3xl font-light italic tracking-tight text-[#3D1A4E] md:text-4xl">
                {item}
              </span>
              <Asterisk className="h-6 w-6 shrink-0 text-neutral-300" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
