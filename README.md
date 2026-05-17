# server-correo

Backend server for sending emails via the [Resend](https://resend.com/) API. Built with Express.js and TypeScript, it exposes a single protected endpoint to send HTML emails.

## Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js v5
- **Email provider**: Resend
- **Validation**: Zod
- **Rate limiting**: express-rate-limit

## Project structure

```
src/
├── app.ts                          # Entry point
├── config/
│   └── envs.ts                     # Environment variable parsing
├── presentation/
│   ├── server.ts                   # Express server class
│   ├── router.ts                   # Root router
│   ├── email/
│   │   ├── routes.ts               # Email route definitions
│   │   ├── email.service.ts        # Request handler
│   │   └── send-email.dto.ts       # Request body type
│   ├── middleware/
│   │   ├── auth.middleware.ts      # x-api-key token validation
│   │   ├── limiter.middleware.ts   # Rate limiting (5 req/min)
│   │   └── validate.middleware.ts  # Zod schema validation
│   └── schema/
│       └── email.schema.ts         # Zod schema for email body
└── infrastructure/
    └── email/
        ├── datasource/
        │   └── email.datasource.ts # Resend API integration
        └── repository/
            └── email.repository.ts # Repository pattern wrapper
```

## Environment variables

Copy `.env.template` to `.env` and fill in the values:

```env
PORT=3001
PROD=false

# Resend
RESEND_API_KEY=        # API key from resend.com
FROM_EMAIL=            # Verified sender address in Resend

# Internal auth
INTERNAL_API_TOKEN=    # Arbitrary secret token for x-api-key header
```

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Development server with auto-reload (ts-node-dev) |
| `npm run build` | Compile TypeScript → `dist/` |
| `npm start` | Build and run production server |

## API

### POST `/api/email/send-email`

Sends an HTML email through Resend.

**Headers**

| Header | Required | Description |
|---|---|---|
| `x-api-key` | Yes | Must match `INTERNAL_API_TOKEN` |
| `Content-Type` | Yes | `application/json` |

**Body**

```json
{
  "to": "recipient@example.com",
  "subject": "Subject line",
  "html": "<p>Email body</p>"
}
```

| Field | Type | Constraints |
|---|---|---|
| `to` | string | Valid email address |
| `subject` | string | 1–200 characters |
| `html` | string | 1–5000 characters |

**Responses**

| Status | Body | Description |
|---|---|---|
| 200 | `{ "message": "Email enviado" }` | Email sent successfully |
| 400 | `{ "error": "error de validación" }` | Invalid request body |
| 401 | `{ "message": "Unauthorized" }` | Missing or invalid API token |
| 429 | `Too many requests` | Rate limit exceeded |
| 500 | `{ "message": "No se pudo enviar el email" }` | Resend API error |

**Rate limit**: 5 requests per IP per minute.

**Example**

```bash
curl -X POST http://localhost:3000/api/email/send-email \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-token" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Hola",
    "html": "<p>Mensaje de prueba</p>"
  }'
```

## Middleware chain

Every request to `/api/email/send-email` passes through:

1. **CORS** — allows all origins
2. **JSON / URL-encoded body parsing**
3. **`verifyToken`** — validates `x-api-key` against `INTERNAL_API_TOKEN`
4. **`emailLimiter`** — enforces the 5 req/min limit per IP
5. **`validate(emailSchema)`** — validates body with Zod
6. **`sendEmail`** — sends the email and returns the response

## Architecture

The project follows a layered architecture:

- **Presentation** — routes, services, middleware, DTOs, and schemas. Handles HTTP concerns only.
- **Infrastructure** — `EmailDatasource` (Resend SDK) wrapped by `EmailRepository`. Isolated from HTTP layer via the repository pattern.
- **Config** — `envs.ts` parses and validates all environment variables at startup; the app fails fast if any required variable is missing.
