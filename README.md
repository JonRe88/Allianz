# Here are your Instructions

  "project_name": "XIMNANZAS - Allianz PPR Landing Page",
  "theme": "Light mode base for high trust and legibility, using Corporate Allianz Blue (#003781) as the high-contrast structural anchor.",
  "typography": 
    "fonts": 
      "headings": "Playfair Display",
      "body": "Outfit"
    "rules": [
      "Use Playfair Display for all H1, H2, and large editorial manifesto numbers.",
      "Use Outfit for body text, form elements, small labels, and data tables.",
      "Headings should use tracking-tight to tracking-tighter for a premium editorial look.",
      "Never default to bold. Use font-light or font-black to create tension.",
      "Inject Google Fonts: <link href=\"https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap\" rel=\"stylesheet\">"
    ]
  },
  "colors": {
    "brand_primary": "#003781",
    "brand_secondary": "#00255A",
    "background_base": "#FAFAFA",
    "surface": "#FFFFFF",
    "text_primary": "#0A0A0A",
    "text_secondary": "#525252",
    "rules": [
      "Never use pure black or pure white except for structural components.",
      "Use #003781 for primary buttons, massive typography highlights, and the admin sidebar.",
      "No generic full-screen gradients. Keep backgrounds solid or use subtle grain textures."
    ]
  },
  "spacing_and_layout": {
    "grid_system": "Use wide containers (max-w-7xl) with generous padding (py-24 or py-32).",
    "manifesto": "Asymmetric layout. Massive numbers (01, 02) taking 4 columns, text taking 8 columns. Separate chapters with thin 1px borders.",
    "services_grid": "border-collapse style CSS grid. High technical precision."
  },
  "components": {
    "header": {
      "rules": "CRITICAL: Do NOT use a fully transparent background. Use backdrop-blur-xl bg-white/80 or bg-white/90."
    },
    "kinetic_hero": {
      "rules": "Framer Motion masked line-by-line reveal. Wrap each line in an overflow-hidden span. Translate Y from 100% to 0%. Large Playfair Display text."
    },
    "interactive_calculator": {
      "rules": "Shadcn Sliders for 'Aportación Mensual' and 'Edad'. Toggle chips for risk profiles (Conservador 6%, Balanceado 8%, Dinámico 10%). Display year-by-year projection in a neat HTML table or list. Include 'Descargar PDF' button."
    },
    "marquee": {
      "rules": "Slow, editorial motion. Playfair Display text-4xl or larger. Use react-fast-marquee or framer-motion."
    },
    "modals_and_forms": {
      "rules": "Use Shadcn Dialog for 'Agenda una cita' modal with a calendar or contact form inside."
    },
    "admin_dashboard": {
      "rules": "Private route /prospectos. Dense layout. Sidebar navigation. Use Shadcn Table for leads with an 'Export to CSV' button."
    }
  },
  "motion": {
    "scrolling": "Implement @studio-freight/lenis for smooth momentum scrolling. Wraps the main layout.",
    "reveals": "Use framer-motion for whileInView scroll reveals. Staggered fade-up for grid items."
  },
  "accessibility": {
    "contrast": "Ensure #003781 on #FAFAFA meets APCA minimums.",
    "testing": "All interactive elements MUST have data-testid attributes.",
    "motion": "Respect prefers-reduced-motion media query."
  },
  "media": {
    "image_urls": [
      {
        "url": "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc4NzY4ODg3NHww&ixlib=rb-4.1.0&q=85",
        "category": "hero_or_advisor",
        "description": "Mature professional businessman portrait."
      },
      {
        "url": "https://images.pexels.com/photos/11888495/pexels-photo-11888495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "category": "background_architecture",
        "description": "Elegant minimalist staircase for manifesto backdrop."
      },
      {
        "url": "https://images.pexels.com/photos/7231071/pexels-photo-7231071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "category": "lifestyle_retirement",
        "description": "Senior couple enjoying sunlit room."
      },
      {
        "url": "https://images.pexels.com/photos/5784807/pexels-photo-5784807.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "category": "finance_graph",
        "description": "Abstract finance graph blue for calculator or investment sections."
      }
    ]
  },
  "UNIVERSAL GUIDELINES FOR MAIN AGENT": [
    "You are building for a .js (JavaScript/JSX) environment. DO NOT use TypeScript (.tsx) types or interfaces.",
    "Use react-router-dom for routes: /, /seguro-de-vida, /inversion-inteligente, /gastos-medicos-mayores, /auto-y-hogar, /prospectos.",
    "Use pre-existing Shadcn components from src/components/ui when applicable. Rely on Shadcn for Sliders, Tables, Inputs, and Dialogs.",
    "Never center align the entire app container. Use optical alignment over geometric alignment.",
    "Every interaction needs micro-animations - hover states, transitions. Exclude transform from 'transition-all'.",
    "Always apply data-testid to buttons, inputs, links, and forms for testing stability.",
    "Use 2-3x more spacing than feels comfortable. The design must feel high-end, premium, and breathable.",
    "For the admin panel, prioritize function and density. Use sharp edges and simple layouts.",
    "Do NOT use placeholder image URLs. Only use the provided image URLs in this JSON.",
    "Do NOT use emojis for icons. Use lucide-react or phosphor-icons.",
    "Inject Google Fonts Playfair Display and Outfit into the index.html or global css."
