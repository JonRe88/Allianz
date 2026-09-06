import { useState } from "react";

import { useRef } from "react";

import { toast } from "sonner";

import { Loader2, Send, ArrowRight, MousePointer2 } from "lucide-react";

import { motion, useScroll, useTransform } from "framer-motion";

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

const HERO_IMG =

  "https://images.pexels.com/photos/36729964/pexels-photo-36729964.jpeg?auto=compress&cs=tinysrgb&w=1920";

const INTERESTS = [

  "Plan Personal de Retiro",

  "Ahorro para el retiro",

  "Deducción de impuestos",

  "Protección financiera",

  "Otro",

];
const WHATSAPP_NUMBER = "525951069096";

const submit = async (e) => {

  e.preventDefault();

  if (

    !form.name.trim() ||

    !form.email.trim() ||

    !form.phone.trim()

  ) {

    toast.error("Completa nombre, email y teléfono.");

    return;

  }

  setLoading(true);

  try {

    // Primero guarda el lead en tu backend

    await api.post("/leads", form);

    const message = `

Hola, quiero información sobre un Plan Personal de Retiro.

👤 Nombre: ${form.name}

📧 Email: ${form.email}

📱 Teléfono: ${form.phone}

💼 Me interesa: ${form.interest}

💬 Mensaje: ${form.message || "Sin mensaje adicional"}

    `.trim();

    const whatsappUrl =

      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Abre WhatsApp con el mensaje preparado

    window.open(whatsappUrl, "_blank");

    toast.success("Recibido. Un asesor te contactará muy pronto.");

    setForm({

      name: "",

      email: "",

      phone: "",

      interest: INTERESTS[0],

      message: "",

    });

  } catch (error) {

    toast.error("No pudimos enviar tu solicitud. Intenta de nuevo.");

  } finally {

    setLoading(false);

  }

};

const scrollToSection = (hash) => {

  document.querySelector(hash)?.scrollIntoView({

    behavior: "smooth",

  });

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

  const { scrollYProgress } = useScroll({

    target: ref,

    offset: ["start start", "end start"],

  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [form, setForm] = useState({

    name: "",

    phone: "",

    email: "",

    interest: INTERESTS[0],

    message: "",

  });

  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => {

    setForm((prev) => ({

      ...prev,

      [field]: e.target.value,

    }));

  };

  const submit = async (e) => {

    e.preventDefault();

    if (!form.name || !form.phone || !form.email) {

      toast.error("Completa los campos obligatorios.");

      return;

    }

    setLoading(true);

    try {

      // Aquí puedes conectar tu API o servicio de formularios.

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Datos del formulario:", form);

      toast.success("¡Gracias! Te contactaremos pronto.");

      setForm({

        name: "",

        phone: "",

        email: "",

        interest: INTERESTS[0],

        message: "",

      });

    } catch (error) {

      toast.error("Ocurrió un error. Inténtalo nuevamente.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <section

      id="inicio"

      ref={ref}

      data-testid="hero-section"

      className="noise-overlay relative overflow-hidden bg-brand-charcoal"

    >

      {/* Imagen de fondo */}

      <motion.div

        style={{ y: bgY }}

        className="absolute inset-0 -top-[10%] h-[120%]"

      >

        <img

          src={HERO_IMG}

          alt="Pareja planeando su futuro financiero"

          data-testid="hero-image"

          className="h-full w-full object-cover"

        />

      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/70 to-brand-charcoal/40" />

      <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/80 via-transparent to-transparent" />

      {/* Contenido principal */}

      <motion.div

        style={{ opacity: fade }}

        className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-end px-6 pb-16 pt-32 lg:px-16"

      >

        <div className="grid w-full items-end gap-16 lg:grid-cols-12">

          {/* Texto */}

          <div className="max-w-2xl lg:col-span-7">

            <motion.span

              initial={{ opacity: 0, y: 16 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.2, duration: 0.8 }}

              className="overline-label mb-8 block text-brand-sageLight"

              data-testid="hero-overline"

            >

              Plan Personal de Retiro Allianz · Asesoría XIMNANZAS

            </motion.span>

            <h1

              className="font-serif text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"

              data-testid="hero-heading"

            >

              <MaskedLine delay={0.35}>Tu retiro</MaskedLine>

              <MaskedLine delay={0.5}>

                <em className="font-serif italic text-brand-sageLight">

                  empieza

                </em>

              </MaskedLine>

              <MaskedLine delay={0.65}>hoy.</MaskedLine>

            </h1>

            <motion.span

              initial={{ opacity: 0, y: 24 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 1.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}

              className="mt-8 block max-w-xl text-base font-light leading-relaxed text-brand-sageLight/90 md:text-lg"

            >

              Un Plan Personal de Retiro que crece con interés compuesto,

              deduce impuestos desde el primer día y te da la libertad de

              vivir mañana como lo sueñas hoy.

            </motion.span>

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

                <div

                  key={small}

                  className="border-l border-brand-sageLight/30 pl-4"

                >

                  <p className="font-serif text-3xl font-bold">{big}</p>

                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-sageLight/80">

                    {small}

                  </p>

                </div>

              ))}

            </motion.div>

          </div>

          {/* Formulario */}

          <motion.form

            initial={{ opacity: 0, y: 24 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true, margin: "-80px" }}

            transition={{ duration: 0.8, delay: 0.15 }}

            onSubmit={submit}

            data-testid="lead-form"

            className="rounded-2xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl lg:col-span-5 lg:p-8"

          >

            <div className="mb-8">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3D1A4E]">

                Da el primer paso

              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">

                Construye el retiro que imaginas.

              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-300">

                Déjanos tus datos y un asesor te contactará para conocer tus

                objetivos.

              </p>

            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              <div className="grid gap-2">

                <Label htmlFor="lead-name">Nombre completo</Label>

                <Input

                  id="lead-name"

                  data-testid="lead-name-input"

                  value={form.name}

                  onChange={set("name")}

                  placeholder="Tu nombre"

                  className="rounded-none"

                  required

                />

              </div>

              <div className="grid gap-2">

                <Label htmlFor="lead-phone">Teléfono</Label>

                <Input

                  id="lead-phone"

                  data-testid="lead-phone-input"

                  value={form.phone}

                  onChange={set("phone")}

                  placeholder="55 1234 5678"

                  className="rounded-none"

                  required

                />

              </div>

            </div>

            <div className="mt-6 grid gap-2">

              <Label htmlFor="lead-email">Email</Label>

              <Input

                id="lead-email"

                type="email"

                data-testid="lead-email-input"

                value={form.email}

                onChange={set("email")}

                placeholder="tu@email.com"

                className="rounded-none"

                required

              />

            </div>

            <div className="mt-6 grid gap-2">

              <Label htmlFor="lead-interest">Me interesa</Label>

              <select

                id="lead-interest"

                data-testid="lead-interest-select"

                value={form.interest}

                onChange={set("interest")}

                className="h-9 w-full border border-input bg-transparent px-3 text-sm outline-none focus:border-[#3D1A4E]"

              >

                {INTERESTS.map((i) => (

                  <option key={i} value={i}>

                    {i}

                  </option>

                ))}

              </select>

            </div>

            <div className="mt-6 grid gap-2">

              <Label htmlFor="lead-message">Mensaje (opcional)</Label>

              <Textarea

                id="lead-message"

                data-testid="lead-message-input"

                value={form.message}

                onChange={set("message")}

                placeholder="Cuéntame tu situación o tus dudas…"

                className="min-h-28 rounded-none"

              />

            </div>

            <Button

              data-testid="lead-submit-button"

              type="submit"

              disabled={loading}

              className="mt-8 w-full rounded-2xl bg-[#3D1A4E] py-6 text-xs font-semibold uppercase tracking-widest hover:bg-[#6B3F8A] sm:w-auto sm:px-12"

            >

              {loading ? (

                <Loader2 className="h-4 w-4 animate-spin" />

              ) : (

                <Send className="h-4 w-4" />

              )}

              {loading ? "Enviando..." : "Quiero que me contacten"}

            </Button>

          </motion.form>

        </div>

      </motion.div>

      {/* Indicador de scroll */}

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