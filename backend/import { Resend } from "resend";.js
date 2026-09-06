import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.apiKeys.update(
  "6950ff6a-5ec4-4c1d-8a33-d1d0ad32f969",
  { name: "XIMNANZAS Production" }
);