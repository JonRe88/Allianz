# Auth Testing Playbook

## Credenciales
Ver /app/memory/test_credentials.md (admin@ximnanzas.com).

## Paso 1: MongoDB
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
```
Verificar: password_hash empieza con `$2b$`, índice único en users.email, índice en login_attempts.identifier.

## Paso 2: API
```
curl -c cookies.txt -X POST $API/api/auth/login -H "Content-Type: application/json" \
  -d '{"email":"admin@ximnanzas.com","password":"Ximnanzas.Admin.2026!"}'
cat cookies.txt   # access_token + refresh_token httpOnly
curl -b cookies.txt $API/api/auth/me
curl -b cookies.txt $API/api/leads
curl -b cookies.txt -X POST $API/api/auth/logout
```

## Paso 3: Lockout
5 logins con contraseña incorrecta → el 6º intento (incluso correcto) responde 429 por 15 min.
