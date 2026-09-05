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

- Simulador: sliders aportación mensual ($1k–$50k) y edad (18–64); perfiles Conservador 6% / Moderado 8% / Agresivo 10%; tabla año por año; descarga PDF landscape con marca XIMNANZAS.
- Modal cita: calendario (días pasados y domingos bloqueados), horarios 10–13 y 16–18, nombre/teléfono → POST /api/appointments.
- Leads: formulario → POST /api/leads. Ambos disparan email al owner.
- Admin: login JWT (lockout 5 intentos/15 min), tabla leads + citas, exportar CSV, logout.

## Implementado
- 2026-08-25: Iteración completa construida desde cero — landing (hero cinético con parallax, marquee lento, manifiesto 01–04, simulador + PDF + leyenda de servicios, grid de servicios, testimonios, formulario, footer), 4 páginas de producto compartiendo ProductPage, modal de citas, panel /prospectos con auth JWT + lockout + CSV, emails al owner vía Resend gestionado (verificado 202 Accepted), seed de admin idempotente.
- 2026-08-25 (Iteración 5): WhatsApp real (+52 595 106 9096) en CTAs; gráfica de área animada (recharts) en el simulador con saldo vs aportado; recordatorio automático de cita al owner un día antes (loop horario en backend, tz America/Mexico_City, marca reminder_sent — verificado con cita de prueba); filtros en /prospectos (búsqueda texto, interés, fecha + limpiar filtros).
- 2026-08-25 (Iteración 6): Logo XIMNANZAS real en header y footer; tira de logos institucionales (Allianz Distribuidor Autorizado, AMIB, CNSF) antes del footer; Testimonios rediseñados ("Ellos ya empezaron su hoy", 3 tarjetas con copy del cliente); nueva sección Preguntas Frecuentes con acordeón (6 Q&A PPR) y CTA de WhatsApp.
- 2026-08-25 (Iteración 7): Hero reemplazado por el diseño de Figma del cliente — full-screen oscuro charcoal, foto de pareja con parallax, "Tu retiro empieza hoy." con reveal enmascarado, acento gold (#B8860B), "PPR" gigante con stroke dorado, stats (+130 años / Art. 151 / 100%), indicador de scroll; tokens brand-charcoal/gold/sageLight + clases overline-label/noise-overlay/text-stroke-gold añadidos al sistema.
- 2026-08-26: Tira de logos institucionales movida justo debajo del hero (antes estaba antes del footer).
- 2026-08-26 (Iteración 8): Retemado completo a la paleta oficial de marca XIMNANZAS — Ciruela Profundo #3D1A4E (primario, reemplaza azul Allianz), Ciruela Medio #6B3F8A (hovers), Carbón Oscuro #1E1E2E (hero, simulador, login admin, footer), Crema Cálido #FAF7F2 (fondos claros), Dorado Aspiracional #B8850A (CTA hero + itálicas de énfasis en Testimonios/FAQ), Salvia Claro #D8F0E5 (texto sobre oscuro). Tokens Tailwind brand y CSS vars actualizados; PDF del simulador con encabezado ciruela.

- 2026-08-26 (Iteración 9): Estado de prospectos — campo `status` en leads (default "Nuevo") + endpoint `PATCH /api/leads/{id}/status` (JWT, valida Nuevo/Contactado/En seguimiento/Cerrado); columna "Estado" con selector de colores en la tabla de prospectos (guardado optimista al instante) e incluido en el CSV. Botón "Exportar CSV" también en la pestaña de Citas (Nombre, Teléfono, Fecha, Hora, Registrada). Verificado por curl (default, PATCH válido/ inválido, auth) y screenshots.

## Backlog
- P1: Selector de edad de retiro, recordatorio de cita por WhatsApp.
- P2: Multi-asesor con asignación de leads, envío de proyección PDF por email al prospecto, filtro por estado en tabla de prospectos.

## Próximas tareas
1. Filtro por estado en la tabla de prospectos.
2. Recordatorio de cita por WhatsApp.
3. Selector de edad de retiro en el simulador.
