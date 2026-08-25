# PRD — XIMNANZAS · Allianz PPR Landing Page (México)

## Problem statement (original)
Landing page premium estilo Awwwards para asesor Allianz independiente en México (marca XIMNANZAS), enfocada en Plan Personal de Retiro (PPR): hero cinético con reveal línea por línea, manifiesto numerado, simulador interactivo de retiro con sliders y perfiles de riesgo, marquee editorial, testimonios, formulario de leads, grid de otros servicios, 4 páginas de producto, modal "Agenda una cita" con calendario, y panel privado /prospectos con login admin JWT + exportar CSV. Azul Allianz #003781, Playfair Display + Outfit, Framer Motion + Lenis, Shadcn UI.

## User personas
- Profesionista mexicano 30–55 años que quiere simular y planear su retiro.
- Visitante interesado en seguros/inversión que busca asesoría por WhatsApp o cita.
- Owner (Ximena): recibe emails de leads/citas y administra prospectos en /prospectos.

## Arquitectura
- Frontend: React 19 + react-router-dom 7, Tailwind + Shadcn UI, framer-motion, lenis, jspdf + jspdf-autotable, sonner.
- Backend: FastAPI + Motor (MongoDB), JWT (pyjwt) con cookies httpOnly, bcrypt, httpx → proxy de email Emergent (Resend gestionado).
- Rutas: / , /seguro-de-vida, /inversion-inteligente, /gastos-medicos-mayores, /auto-y-hogar, /prospectos.

## Core requirements (static)
- Simulador: sliders aportación mensual ($1k–$50k) y edad (18–64); perfiles Conservador 6% / Balanceado 8% / Dinámico 10%; tabla año por año; descarga PDF landscape con marca XIMNANZAS.
- Modal cita: calendario (días pasados y domingos bloqueados), horarios 10–13 y 16–18, nombre/teléfono → POST /api/appointments.
- Leads: formulario → POST /api/leads. Ambos disparan email al owner.
- Admin: login JWT (lockout 5 intentos/15 min), tabla leads + citas, exportar CSV, logout.

## Implementado
- 2026-08-25: Iteración completa construida desde cero — landing (hero cinético con parallax, marquee lento, manifiesto 01–04, simulador + PDF + leyenda de servicios, grid de servicios, testimonios, formulario, footer), 4 páginas de producto compartiendo ProductPage, modal de citas, panel /prospectos con auth JWT + lockout + CSV, emails al owner vía Resend gestionado (verificado 202 Accepted), seed de admin idempotente.

## Backlog
- P0: Número real de WhatsApp (actual es placeholder 5215500000000).
- P1: Gráfica de área en el simulador (recharts), selector de edad de retiro, recordatorio de cita por email.
- P2: Multi-asesor con asignación de leads, filtros/búsqueda en el panel, envío de proyección PDF por email al prospecto.

## Próximas tareas
1. Sustituir número de WhatsApp placeholder por el real.
2. Añadir gráfica de crecimiento al simulador.
3. Filtros por interés/fecha en /prospectos.
