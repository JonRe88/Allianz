import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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

export const AppointmentDialog = ({ open, onOpenChange }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // REINICIAR FORMULARIO
  // ==========================================
  const reset = () => {
    setDate(null);
    setTime(null);
    setName("");
    setPhone("");
  };

  // ==========================================
  // ENVIAR CITA A FORMSPREE
  // ==========================================
  const submit = async (e) => {
    e.preventDefault();

    // Validación
    if (!date || !time || !name.trim() || !phone.trim()) {
      toast.error(
        "Completa fecha, horario, nombre y teléfono."
      );
      return;
    }

    setLoading(true);

    try {
      // Datos que enviaremos a Formspree
      const formData = {
        nombre: name.trim(),
        telefono: phone.trim(),

        fecha: format(
          date,
          "EEEE d 'de' MMMM 'de' yyyy",
          {
            locale: es,
          }
        ),

        horario: `${time} hrs`,

        asunto: "Nueva solicitud de cita - Ximnanzas",
      };

      // ==========================================
      // FORMSPREE
      // CAMBIA TU_FORM_ID POR TU ID REAL
      // ==========================================
      const response = await fetch(
        "https://formspree.io/f/xzebyaod",
        {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      // Si Formspree devuelve error
      if (!response.ok) {
        throw new Error(
          result?.error ||
            "No se pudo enviar la solicitud."
        );
      }

      // ==========================================
      // ÉXITO
      // ==========================================
      toast.success(
        "Solicitud enviada correctamente. Te contactaremos para confirmar tu cita."
      );

      // Cerrar modal
      onOpenChange(false);

      // Limpiar formulario
      reset();

    } catch (error) {
      console.error(
        "Error enviando formulario:",
        error
      );

      toast.error(
        "No pudimos enviar tu solicitud. Intenta de nuevo."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        data-testid="appointment-dialog"
        className="max-h-[90vh] overflow-y-auto rounded-none sm:max-w-2xl"
      >
        {/* ======================================
            HEADER
        ====================================== */}
        <DialogHeader>
          <DialogTitle
            className="
              font-serif
              text-2xl
              font-normal
              tracking-tight
              text-[#0A0A0A]
            "
          >
            Agenda una cita
          </DialogTitle>

          <DialogDescription
            className="
              text-sm
              font-light
              text-neutral-600
            "
          >
            Elige día y horario. Un asesor certificado
            te contactará para confirmar.
          </DialogDescription>
        </DialogHeader>

        {/* ======================================
            FORMULARIO
        ====================================== */}
        <form
          onSubmit={submit}
          className="grid gap-8 md:grid-cols-2"
        >
          {/* ====================================
              CALENDARIO
          ==================================== */}
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={es}

              // No permite fechas anteriores
              // ni domingos
              disabled={[
                {
                  before: new Date(),
                },
                {
                  dayOfWeek: [0],
                },
              ]}

              data-testid="appointment-calendar"

              className="
                rounded-md
                border
                border-black/10
              "
            />
          </div>

          {/* ====================================
              INFORMACIÓN DE LA CITA
          ==================================== */}
          <div className="flex flex-col gap-5">

            {/* ==================================
                HORARIOS
            ================================== */}
            <div>
              <p
                className="
                  mb-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-widest
                  text-neutral-500
                "
              >
                Horario
              </p>

              <div
                className="grid grid-cols-3 gap-2"
                data-testid="appointment-time-slots"
              >
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"

                    data-testid={`time-slot-${slot.replace(
                      ":",
                      ""
                    )}`}

                    onClick={() =>
                      setTime(slot)
                    }

                    className={`
                      border
                      px-2
                      py-2
                      text-sm
                      transition-colors

                      ${
                        time === slot
                          ? `
                            border-[#3D1A4E]
                            bg-[#3D1A4E]
                            text-white
                          `
                          : `
                            border-black/15
                            text-neutral-700
                            hover:border-[#3D1A4E]
                            hover:text-[#3D1A4E]
                          `
                      }
                    `}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* ==================================
                NOMBRE
            ================================== */}
            <div className="grid gap-2">
              <Label htmlFor="appt-name">
                Nombre completo
              </Label>

              <Input
                id="appt-name"
                data-testid="appointment-name-input"

                value={name}

                onChange={(e) =>
                  setName(e.target.value)
                }

                placeholder="Tu nombre"

                className="rounded-none"

                required
              />
            </div>

            {/* ==================================
                TELÉFONO
            ================================== */}
            <div className="grid gap-2">
              <Label htmlFor="appt-phone">
                Teléfono
              </Label>

              <Input
                id="appt-phone"
                data-testid="appointment-phone-input"

                type="tel"

                value={phone}

                onChange={(e) =>
                  setPhone(e.target.value)
                }

                placeholder="55 1234 5678"

                className="rounded-none"

                required
              />
            </div>

            {/* ==================================
                RESUMEN
            ================================== */}
            {date && (
              <div
                data-testid="appointment-summary"
                className="
                  border-l-2
                  border-[#3D1A4E]
                  bg-neutral-50
                  px-4
                  py-3
                  text-sm
                  text-neutral-600
                "
              >
                <p className="font-medium text-[#3D1A4E]">
                  Tu cita
                </p>

                <p className="mt-1">
                  {format(
                    date,
                    "EEEE d 'de' MMMM 'de' yyyy",
                    {
                      locale: es,
                    }
                  )}
                </p>

                {time && (
                  <p>
                    {time} hrs
                  </p>
                )}
              </div>
            )}

            {/* ==================================
                BOTÓN
            ================================== */}
            <Button
              data-testid="appointment-submit-button"

              type="submit"

              disabled={
                loading ||
                !date ||
                !time ||
                !name.trim() ||
                !phone.trim()
              }

              className="
                mt-auto
                rounded-none
                bg-[#3D1A4E]
                py-6
                text-xs
                font-semibold
                uppercase
                tracking-widest
                hover:bg-[#6B3F8A]
              "
            >
              {loading ? (
                <>
                  <Loader2
                    className="
                      mr-2
                      h-4
                      w-4
                      animate-spin
                    "
                  />

                  Enviando...
                </>
              ) : (
                "Confirmar cita"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};