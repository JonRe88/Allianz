import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const INTERESTS = [
  "Plan Personal de Retiro",
  "Seguro de Vida",
  "Inversión Inteligente",
  "Gastos Médicos Mayores",
  "Auto y Hogar",
];

// =====================================================
// FORMSPREE
// Reemplaza TU_FORM_ID por el ID de tu formulario
// Ejemplo:
// https://formspree.io/f/xabcdefg
// =====================================================

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwlkanyw";

export const LeadForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: INTERESTS[0],
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // =====================================================
  // ACTUALIZAR CAMPOS
  // =====================================================

  const set = (key) => (event) => {
    setForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  // =====================================================
  // ENVIAR FORMULARIO
  // =====================================================

  const submit = async (event) => {
    event.preventDefault();

    // Validación básica
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      toast.error("Completa nombre, email y teléfono.");
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      toast.error("Introduce un email válido.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          interest: form.interest,
          message: form.message || "Sin mensaje adicional",

          // Información adicional para identificar el origen
          source: "Formulario de contacto Ximnanzas",
          website: "ximnanzas.com",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.errors
            ?.map((error) => error.message)
            .join(", ") ||
            "No se pudo enviar el formulario."
        );
      }

      // =================================================
      // ÉXITO
      // =================================================

      toast.success(
        "Recibido. Un asesor te contactará muy pronto."
      );

      // Limpiar formulario
      setForm({
        name: "",
        email: "",
        phone: "",
        interest: INTERESTS[0],
        message: "",
      });
    } catch (error) {
      console.error("Error enviando formulario:", error);

      toast.error(
        "No pudimos enviar tu solicitud. Intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contacto"
      data-testid="lead-form-section"
      className="grain relative bg-[#3D1A4E] py-24 text-white lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">

        {/* =================================================
            INFORMACIÓN DE CONTACTO
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: 0.8,
          }}
          className="lg:col-span-5"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Contacto
          </p>

          <h2 className="font-serif text-4xl font-light tracking-tighter md:text-5xl">
            Hablemos de tu futuro, sin compromiso.
          </h2>

          <p className="mt-8 max-w-sm text-base font-light leading-relaxed text-white/70">
            Cuéntame qué te interesa y te contacto en menos de
            24 horas con una propuesta hecha a tu medida.
          </p>

          <div className="mt-12 space-y-4 text-sm font-light text-white/70">

            <p>
              <span className="mr-3 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                Email
              </span>

              ximenalalith.allianzmlp@gmail.com
            </p>

            <p>
              <span className="mr-3 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                Horario
              </span>

              Lunes a sábado · 10:00 — 18:00
            </p>

          </div>
        </motion.div>

        {/* =================================================
            FORMULARIO
        ================================================= */}

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          onSubmit={submit}
          data-testid="lead-form"
          className="bg-white p-8 text-[#0A0A0A] lg:col-span-7 lg:p-12"
        >

          {/* =================================================
              NOMBRE + TELÉFONO
          ================================================= */}

          <div className="grid gap-6 sm:grid-cols-2">

            <div className="grid gap-2">
              <Label htmlFor="lead-name">
                Nombre completo
              </Label>

              <Input
                id="lead-name"
                name="name"
                data-testid="lead-name-input"
                value={form.name}
                onChange={set("name")}
                placeholder="Tu nombre"
                autoComplete="name"
                required
                className="rounded-none"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lead-phone">
                Teléfono
              </Label>

              <Input
                id="lead-phone"
                name="phone"
                type="tel"
                data-testid="lead-phone-input"
                value={form.phone}
                onChange={set("phone")}
                placeholder="55 1234 5678"
                autoComplete="tel"
                required
                className="rounded-none"
              />
            </div>

          </div>

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="mt-6 grid gap-2">

            <Label htmlFor="lead-email">
              Email
            </Label>

            <Input
              id="lead-email"
              name="email"
              type="email"
              data-testid="lead-email-input"
              value={form.email}
              onChange={set("email")}
              placeholder="tu@email.com"
              autoComplete="email"
              required
              className="rounded-none"
            />

          </div>

          {/* =================================================
              INTERÉS
          ================================================= */}

          <div className="mt-6 grid gap-2">

            <Label htmlFor="lead-interest">
              Me interesa
            </Label>

            <select
              id="lead-interest"
              name="interest"
              data-testid="lead-interest-select"
              value={form.interest}
              onChange={set("interest")}
              className="h-9 w-full border border-input bg-transparent px-3 text-sm outline-none focus:border-[#3D1A4E]"
            >
              {INTERESTS.map((interest) => (
                <option
                  key={interest}
                  value={interest}
                >
                  {interest}
                </option>
              ))}
            </select>

          </div>

          {/* =================================================
              MENSAJE
          ================================================= */}

          <div className="mt-6 grid gap-2">

            <Label htmlFor="lead-message">
              Mensaje (opcional)
            </Label>

            <Textarea
              id="lead-message"
              name="message"
              data-testid="lead-message-input"
              value={form.message}
              onChange={set("message")}
              placeholder="Cuéntame tu situación o tus dudas…"
              className="min-h-28 rounded-none"
            />

          </div>

          {/* =================================================
              BOTÓN
          ================================================= */}

          <Button
            data-testid="lead-submit-button"
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-none bg-[#3D1A4E] py-6 text-xs font-semibold uppercase tracking-widest hover:bg-[#6B3F8A] sm:w-auto sm:px-12"
          >

            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Quiero que me contacten
              </>
            )}

          </Button>

        </motion.form>
      </div>
    </section>
  );
};