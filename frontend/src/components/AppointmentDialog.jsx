import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const TIME_SLOTS = ["10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00"];

export const AppointmentDialog = ({ open, onOpenChange }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setDate(null);
    setTime(null);
    setName("");
    setPhone("");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!date || !time || !name.trim() || !phone.trim()) {
      toast.error("Completa fecha, horario, nombre y teléfono.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/appointments", {
        name: name.trim(),
        phone: phone.trim(),
        date: format(date, "yyyy-MM-dd"),
        time,
      });
      toast.success("Cita agendada. Te contactaremos para confirmarla.");
      onOpenChange(false);
      reset();
    } catch {
      toast.error("No pudimos agendar tu cita. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="appointment-dialog" className="max-h-[90vh] overflow-y-auto rounded-none sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-normal tracking-tight text-[#0A0A0A]">
            Agenda una cita
          </DialogTitle>
          <DialogDescription className="text-sm font-light text-neutral-600">
            Elige día y horario. Un asesor certificado te contactará para confirmar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-8 md:grid-cols-2">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={es}
              disabled={[{ before: new Date() }, { dayOfWeek: [0] }]}
              data-testid="appointment-calendar"
              className="rounded-md border border-black/10"
            />
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">Horario</p>
              <div className="grid grid-cols-3 gap-2" data-testid="appointment-time-slots">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    data-testid={`time-slot-${slot.replace(":", "")}`}
                    onClick={() => setTime(slot)}
                    className={`border px-2 py-2 text-sm transition-colors ${
                      time === slot
                        ? "border-[#003781] bg-[#003781] text-white"
                        : "border-black/15 text-neutral-700 hover:border-[#003781] hover:text-[#003781]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="appt-name">Nombre completo</Label>
              <Input
                id="appt-name"
                data-testid="appointment-name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="rounded-none"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="appt-phone">Teléfono</Label>
              <Input
                id="appt-phone"
                data-testid="appointment-phone-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="55 1234 5678"
                className="rounded-none"
              />
            </div>
            {date && (
              <p className="text-sm text-neutral-600" data-testid="appointment-summary">
                {format(date, "EEEE d 'de' MMMM", { locale: es })}
                {time ? ` · ${time} hrs` : ""}
              </p>
            )}
            <Button
              data-testid="appointment-submit-button"
              type="submit"
              disabled={loading}
              className="mt-auto rounded-none bg-[#003781] py-6 text-xs font-semibold uppercase tracking-widest hover:bg-[#00255A]"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirmar cita"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
