const FORMSPREE_ENDPOINT = process.env.REACT_APP_FORMSPREE_ENDPOINT || "https://formspree.io/f/xwlkanyw";

export async function submitLead(formData) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: "Nuevo prospecto — XIMNANZAS",
      _replyto: formData.email,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      interest: formData.interest,
      message: formData.message || "Sin mensaje adicional",
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar el formulario");
  }

  return response.json();
}

export async function submitAppointment(formData) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: "Nueva cita agendada — XIMNANZAS",
      _replyto: formData.phone,
      name: formData.name,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo agendar la cita");
  }

  return response.json();
}