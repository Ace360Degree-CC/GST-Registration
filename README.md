# GST Registration Website

## Lead Form Email Flow

When the form is submitted:
1. A lead email is sent to the main receiver (`MAIL_TO`).
2. A thank-you email is sent to the form filler (`email` from the form).

## Setup

1. Copy `.env.example` to `.env`.
2. Fill SMTP and mail values in `.env`.
3. Install dependencies:

```bash
npm install
```

## Run Locally

Frontend:

```bash
npm run dev
```

Backend mail API:

```bash
npm run dev:server
```

Vite proxies `/api/*` requests to `http://localhost:4000` during development.
