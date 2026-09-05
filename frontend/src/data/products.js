export const WHATSAPP_URL =
  "https://wa.me/525951069096?text=Hola%2C%20quiero%20asesor%C3%ADa%20sobre%20los%20servicios%20de%20XIMNANZAS";

export const IMAGES = {
  advisor:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc4NzY4ODg3NHww&ixlib=rb-4.1.0&q=85",
  architecture:
    "https://images.pexels.com/photos/11888495/pexels-photo-11888495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  retirement:
    "https://images.pexels.com/photos/7231071/pexels-photo-7231071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  finance:
    "https://images.pexels.com/photos/5784807/pexels-photo-5784807.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export const RISK_PROFILES = [
  { id: "conservador", label: "Conservador", rate: 6, desc: "Prioriza la estabilidad del capital." },
  { id: "moderado", label: "Moderado", rate: 8, desc: "Equilibrio entre crecimiento y estabilidad." },
  { id: "agresivo", label: "Agresivo", rate: 10, desc: "Busca maximizar el rendimiento a largo plazo." },
];

export const PRODUCTS = {
  "seguro-de-vida": {
    slug: "seguro-de-vida",
    title: "Seguro de Vida",
    tagline: "Protección absoluta para quienes más quieres.",
    description:
      "Un seguro de vida Allianz garantiza que tu familia mantenga su calidad de vida pase lo que pase. Suma asegurada flexible, coberturas por invalidez y beneficios en vida.",
    benefits: [
      "Suma asegurada desde $1,000,000 MXN adaptable a tu etapa de vida.",
      "Cobertura por invalidez total y permanente sin costo oculto.",
      "Beneficios en vida: anticipo por enfermedades graves.",
      "Respaldo de Allianz, una de las aseguradoras más sólidas del mundo.",
    ],
    image: IMAGES.retirement,
    chapter: "01",
  },
  "inversion-inteligente": {
    slug: "inversion-inteligente",
    title: "Inversión Inteligente",
    tagline: "Tu dinero trabajando con estrategia, no con suerte.",
    description:
      "Portafolios diversificados administrados por expertos de Allianz. Desde perfiles conservadores hasta estrategias dinámicas, con la disciplina que tu patrimonio merece.",
    benefits: [
      "Portafolios diversificados en instrumentos nacionales e internacionales.",
      "Perfiles de riesgo Conservador, Moderado y Agresivo.",
      "Liquidez parcial sin penalizaciones después del primer año.",
      "Acompañamiento personalizado de un asesor certificado.",
    ],
    image: IMAGES.finance,
    chapter: "02",
  },
  "gastos-medicos-mayores": {
    slug: "gastos-medicos-mayores",
    title: "Gastos Médicos Mayores",
    tagline: "La mejor medicina es no preocuparte por el costo.",
    description:
      "Acceso a la red hospitalaria más amplia de México con cobertura nacional e internacional. Porque tu salud y la de tu familia no admiten improvisación.",
    benefits: [
      "Cobertura hasta $200 millones MXN por padecimiento.",
      "Red hospitalaria premium: ABC, Angeles, Médica Sur y más.",
      "Cobertura internacional para emergencias y tratamientos.",
      "Atención telefónica y app Allianz 24/7.",
    ],
    image: IMAGES.advisor,
    chapter: "03",
  },
  "auto-y-hogar": {
    slug: "auto-y-hogar",
    title: "Auto y Hogar",
    tagline: "Todo lo que has construido, blindado.",
    description:
      "Protege tu patrimonio material con coberturas amplias para tu auto y tu casa. Asistencia vial, daños por fenómenos naturales y responsabilidad civil.",
    benefits: [
      "Cobertura amplia para auto con asistencia vial 24/7 en todo México.",
      "Protección de hogar contra incendio, robo y fenómenos naturales.",
      "Responsabilidad civil familiar incluida.",
      "Ajustadores ágiles y reclamaciones digitales.",
    ],
    image: IMAGES.architecture,
    chapter: "04",
  },
};

export const PRODUCT_LIST = Object.values(PRODUCTS);
