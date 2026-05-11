# GST Registration Website

## Backend Overview

The backend now stores leads in MySQL and optionally sends notification emails.

### Lead APIs

- `POST /api/leads`: create a new lead
- `GET /api/leads`: list leads with pagination and filters
- `PATCH /api/leads/:id/status`: update lead status
- `GET /api/health`: API health check
- `GET /api/health/db`: database connectivity check

### Supported POST fields

`name`, `mobile`, `email`, `service`, `stage`, `formSource`, `source`, `status`, `page_id`, `project_id`

`formSource` is mapped to `form_used` so you can track which form generated each lead.

### Table Routing by formSource

- `header` or `hero` -> `gst_leads_header`
- `footer` -> `gst_leads_footer`
- `popup` -> `gst_leads_popup`

You can override table names using:
`DB_LEADS_TABLE_HEADER`, `DB_LEADS_TABLE_FOOTER`, `DB_LEADS_TABLE_POPUP`.

## Setup

1. Copy `.env.example` to `.env`.
2. Fill database config (`DB_*`) and SMTP config (`SMTP_*`, `MAIL_*`).
3. Install dependencies:

```bash
npm install
```

## Required DB Table

Use your existing table (`gst_leads` by default), and add these optional tracking columns:

```sql
ALTER TABLE gst_leads
ADD COLUMN form_used VARCHAR(100) NULL,
ADD COLUMN page_id VARCHAR(100) NULL,
ADD COLUMN project_id VARCHAR(100) NULL;
```

## Run Locally

Frontend:

```bash
npm run dev
```

Backend API:

```bash
npm run dev:server
```

Vite proxies `/api/*` requests to `http://localhost:4000` during development.
