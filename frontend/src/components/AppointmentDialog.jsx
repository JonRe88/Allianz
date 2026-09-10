import { useState } from "react";
import import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { Loader2, CalendarDays, Clock, User, Phone } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// ======================================================
// CONFIGURACIÓN
// ======================================================

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzebyaod";

// WhatsApp XIMNANZAS
// México +52 + número
const WHATSAPP_NUMBER = "525951069096";

// Horarios disponibles
const TIME_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function AppointmentDialog({
  open,
  onOpenChange,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  // ======================================================
  // ENVIAR CITA
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -----------------------------
    // Validaciones
    // -----------------------------

    if (!name.trim()) {
      toast.error("Ingresa tu nombre.");
      return;
    }

    if (!phone.trim()) {
      toast.error("Ingresa tu teléfono.");
      return;
    }

    if (!date) {
      toast.error("Selecciona una fecha.");
      return;
    }

    if (!time) {
      toast.error("Selecciona un horario.");
      return;
    }

    setLoading(true);

    try {
      // -----------------------------
      // Formato de fecha
      // -----------------------------

      const formattedDate = format(
        date,
        "EEEE d 'de' MMMM 'de' yyyy",
        {
          locale: es,
        }
      );

      // -----------------------------
      // Datos para Formspree
      // -----------------------------

      const formData = {
        name: name.trim(),
        phone: phone.trim(),
        date: formattedDate,
        time: time,
        _subject: "Nueva cita agendada — XIMNANZAS",
      };

      // -----------------------------
      // Enviar a Formspree
      // -----------------------------

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar la solicitud.");
      }

      // ==================================================
      // WHATSAPP
      // ==================================================

      const whatsappMessage = `
📅 *Nueva solicitud de cita — XIMNANZAS*

👤 *Nombre:* ${name.trim()}

📱 *Teléfono:* ${phone.trim()}

📆 *Fecha:* ${formattedDate}

🕐 *Horario:* ${time} hrs

🌐 Solicitud enviada desde:
ximnanzas.com
      `.trim();

      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=` +
        encodeURIComponent(whatsappMessage);

      // -----------------------------
      // Mensaje de éxito
      // -----------------------------

      toast.success("Solicitud enviada correctamente.", {
        description: "Ahora podrás confirmar la cita por WhatsApp.",
      });

      // -----------------------------
      // Abrir WhatsApp
      // -----------------------------

      window.location.href = whatsappUrl;

      // -----------------------------
      // Limpiar formulario
      // -----------------------------

      setName("");
      setPhone("");
      setDate(undefined);
      setTime("");

      onOpenChange(false);

    } catch (error) {
      console.error("Error al enviar cita:", error);

      toast.error("No pudimos enviar la solicitud.", {
        description:
          "Verifica tu conexión e inténtalo nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // DISABLED DATES
  // ======================================================

  const disabledDays = [
    {
      before: new Date(),
    },
    {
      dayOfWeek: [0], // Domingo
    },
  ];

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">

        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Agenda tu cita
          </DialogTitle>

          <DialogDescription>
            Selecciona el día y horario que prefieras.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-4"
        >

          {/* ============================================
              NOMBRE
          ============================================ */}

          <div className="space-y-2">
            <Label htmlFor="appointment-name">
              Nombre completo
            </Label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                id="appointment-name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          {/* ============================================
              TELÉFONO
          ============================================ */}

          <div className="space-y-2">
            <Label htmlFor="appointment-phone">
              Teléfono
            </Label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                id="appointment-phone"
                type="tel"
                placeholder="55 1234 5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          {/* ============================================
              FECHA
          ============================================ */}

          <div className="space-y-2">
            <Label>
              Fecha
            </Label>

            <div className="rounded-xl border p-3 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={disabledDays}
                locale={es}
                initialFocus
              />
            </div>

            {date && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays size={16} />

                {format(
                  date,
                  "EEEE d 'de' MMMM 'de' yyyy",
                  {
                    locale: es,
                  }
                )}
              </div>
            )}
          </div>

          {/* ============================================
              HORARIO
          ============================================ */}

          <div className="space-y-2">
            <Label>
              Horario
            </Label>

            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <Button
                  key={slot}
                  type="button"
                  variant={
                    time === slot
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setTime(slot)}
                  disabled={loading}
                  className="rounded-xl"
                >
                  <Clock
                    size={16}
                    className="mr-2"
                  />

                  {slot}
                </Button>
              ))}
            </div>
          </div>

          {/* ============================================
              RESUMEN
          ============================================ */}

          {date && time && (
            <div className="rounded-xl bg-muted/50 border p-4 space-y-2">

              <p className="text-sm font-medium">
                Resumen de tu cita
              </p>

              <div className="text-sm text-muted-foreground space-y-1">

                <p>
                  <strong>Fecha:</strong>{" "}
                  {format(
                    date,
                    "d 'de' MMMM 'de' yyyy",
                    {
                      locale: es,
                    }
                  )}
                </p>

                <p>
                  <strong>Horario:</strong>{" "}
                  {time} hrs
                </p>

              </div>
            </div>
          )}

          {/* ============================================
              BOTÓN
          ============================================ */}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl"
          >

            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="mr-2 animate-spin"
                />

                Enviando...
              </>
            ) : (
              <>
                Agendar cita
              </>
            )}

          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Al enviar, recibirás la confirmación de tu
            solicitud mediante WhatsApp.
          </p>

        </form>
      </DialogContent>
    </Dialog>
  );
}

⚠️ Hay un detalle importante

El número que me diste es:

5951069096

Yo lo configuré como:

+52 5951069096 → 525951069096

Así que el WhatsApp que abrirá el formulario será:

https://wa.me/525951069096

El flujo quedará:

Cliente selecciona fecha → selecciona hora → introduce nombre/teléfono → Agendar cita → Formspree guarda la solicitud → se abre WhatsApp → mensaje listo para enviar a XIMNANZAS.

Una mejora que te recomiendo

Ahora mismo el mensaje llega a WhatsApp después de que Formspree confirma el envío. Eso es bueno porque no perderás solicitudes si WhatsApp no está instalado.

Si quieres que quede todavía más profesional, puedo hacer que después de enviar aparezca una pantalla:

✓ Solicitud recibida
Tu cita está casi lista
Confirma tu cita por WhatsApp

con un botón grande “Confirmar por WhatsApp”, en lugar de sacar inmediatamente al usuario de la página.