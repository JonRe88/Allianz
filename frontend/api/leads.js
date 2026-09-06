const { db } = require("../lib/mongodb");

const RESEND_API_URL = "https://api.resend.com/emails";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailTable(lead) {
  const rows = [
    ["Tipo", "Prospecto del formulario web"],
    ["Nombre", lead.name],
    ["Email", lead.email],
    ["Teléfono", lead.phone],
    ["Interés", lead.interest],
    ["Mensaje", lead.message || "Sin mensaje"],
  ];

  return `<table role="presentation" style="font-family:Arial,sans-serif">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#525252;font-size:13px">${escapeHtml(label)}</td><td style="padding:8px 0;font-size:14px;color:#0A0A0A"><strong>${escapeHtml(value)}</strong></td></tr>`,
    )
    .join("")}</table>`;
}

async function notifyOwner(lead) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!resendApiKey || !resendFromEmail || !ownerEmail) {
    throw new Error("RESEND_API_KEY, RESEND_FROM_EMAIL or OWNER_EMAIL is not configured");
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: `${process.env.EMAIL_FROM_NAME || "XIMNANZAS"} <${resendFromEmail}>`,
      to: [ownerEmail],
      subject: "Nuevo prospecto - XIMNANZAS",
      html: emailTable(lead),
      ...(process.env.EMAIL_REPLY_TO ? { reply_to: process.env.EMAIL_REPLY_TO } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(`Email provider returned ${response.status}`);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ detail: "Método no permitido" });
  }

  const input = req.body || {};
  const name = String(input.name || "").trim();
  const email = String(input.email || "").trim();
  const phone = String(input.phone || "").trim();

  if (!name || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(422).json({ detail: "Nombre, teléfono y email válido son obligatorios" });
  }

  const lead = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    interest: String(input.interest || "Plan Personal de Retiro").trim(),
    message: String(input.message || "").trim(),
    status: "Nuevo",
    created_at: new Date().toISOString(),
  };

  try {
    await db.collection("leads").insertOne(lead);
    await notifyOwner(lead);
    return res.status(201).json(lead);
  } catch (error) {
    console.error("Lead submission failed", error);
    return res.status(500).json({ detail: "No pudimos procesar tu solicitud" });
  }
};
