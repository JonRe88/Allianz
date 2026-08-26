# Test Credentials
# Agent writes here when creating/modifying auth credentials (admin accounts, test users).
# Testing agent reads this before auth tests. Fork/continuation agents read on startup.

## Admin — Panel /prospectos
- Email: admin@ximnanzas.com
- Password: Ximnanzas.Admin.2026!
- Role: admin (único usuario; no hay registro público)

## Owner (recibe emails de leads y citas)
- ximenalalith.allianzmlp@gmail.com (solo notificaciones, no es login)

## Auth endpoints
- POST /api/auth/login {email, password} → cookies httpOnly (access 2h, refresh 7d)
- POST /api/auth/logout
- GET /api/auth/me
- POST /api/auth/refresh
- Bloqueo: 5 intentos fallidos por ip:email → 15 min
