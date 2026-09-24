# Orbit — Marketing Operating System

A lightweight, white marketing workspace built around one shared client record. The current release implements the foundation and manual/imported-data workflows from the supplied phased brief. Live platform connectors and later advanced phases are still outstanding.

## Open the demo

Open **Orbit-MOS-Demo.html** in a modern desktop browser. It contains the interface and sample data in one file, works offline, and needs no account or installation. If a file preview does not execute JavaScript, download the HTML and open it in your browser.

- Select a sample client from the sidebar.
- Create a task from an opportunity on the dashboard.
- Add clients, keywords, campaigns, content, leads, projects and tasks.
- Switch between task list, board, calendar and due-date timeline views.
- Import CSV records and analytics, or export current records.
- Create a report and choose **Print / Save PDF**.

**The offline demo resets on reload.** It is for review, not durable business storage. Download exports before closing if you want to retain your demo records. AI, team access, and live platform connections are unavailable in the offline file. All included business metrics and contacts are illustrative.

## Run the application locally

Requirements: Node.js 22.13 or later and pnpm 11.25.0. Keep the included lockfile. From this project folder:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm db:local
pnpm dev
```

Open the loopback URL printed by the development server, normally `http://localhost:5173`. **Start your workspace** uses the starter's local development identity. Local data is stored in `.wrangler/state` and survives page reloads and server restarts. This local identity is for development only; it does not authenticate a real account.

`pnpm db:local` applies pending migrations to the local database only and can be rerun. A fresh extraction uses the portable development profile automatically. Preserve `.wrangler/state` if you need to keep local records.

Other commands:

```sh
pnpm typecheck
pnpm test:integration  # Requires pnpm build first; uses an isolated temporary database.
pnpm demo:build        # Writes outputs/Orbit-MOS-Demo.html.
```

The integration suite never writes to a live workspace. No `node_modules`, installed runtimes, private keys, or working databases are included in the source package.

## What works in this release

| Area | Current behavior |
| --- | --- |
| Client workspaces | Create/edit clients; global selector; isolated records and analytics; fresh accounts start empty. |
| Dashboard | Period comparisons, traffic chart, acquisition channels, transparent five-area planning score, and rule-based opportunities. |
| Projects and tasks | Create/edit/delete records; owner, priority, status and due date; project and related-record links; list, board, calendar and due-date views. |
| SEO and competitors | Keyword/rank records, recorded competitor keyword gaps, and single-page source audits from supplied HTML. |
| Strategy and personas | Structured manual planning and persona records. |
| Content and marketing | Shared client records for content, social posts, email copy, ad campaigns, landing pages, PR, eCommerce and search visibility observations. |
| Leads and automation | Lead pipeline; active lead-created rules can create follow-up tasks when the configured value condition is met. |
| Analytics | Validated daily CSV imports; reimporting a date updates its record; date ranges and comparisons; CSV export. |
| Reports | Saved snapshots of selected metrics, health, signals, keywords and tasks, with user commentary and browser print/PDF. |
| AI consultant | Server-side OpenAI Responses API adapter, enabled only when a server secret is configured; rule-based recommendations work without it. |
| Access | Hosted ChatGPT identity adapter; organization/client access checks; roles; owner-managed membership; activity log. |

The health score is Orbit's own planning indicator, not an industry benchmark. Missing areas are excluded and coverage is displayed. Audits inspect supplied markup; they do not crawl a website or certify accessibility.

## Hosting and authentication

The application targets **Sites hosting with a Cloudflare Worker and D1**. The repository includes `.openai/hosting.json`, the Worker-compatible build configuration and SQL migrations. This release has **not been published**; there is no live URL for the marketing app yet.

To publish through Sites, register the project, preserve the `DB` binding, apply the included migrations through the supported publication flow, and use Sites' authenticated access settings. Production identity is supplied by Sites; application roles also control which data a signed-in visitor may access.

**Do not deploy this unchanged behind an arbitrary public web server.** The authentication adapter trusts identity headers injected by the Sites gateway. A different hosting provider requires a real session/OAuth adapter that verifies identity and rejects caller-supplied identity headers. Local mock sign-in is excluded from production builds.

This is not a PHP/cPanel upload or an `/install` wizard. The recommended PostgreSQL/Prisma, email/password and Google OAuth stack in the original brief has not been implemented; this version uses D1 and the Sites identity adapter.

## Optional AI connection

For local development, copy `.dev.vars.example` to `.dev.vars` and enter your own OpenAI API key there. For hosted use, configure `OPENAI_API_KEY` and optional `OPENAI_MODEL` as server secrets through the hosting system. Never place a key in browser code or a shared archive.

Asking a question sends the selected client's marketing profile, non-contact marketing records and recent analytics to OpenAI. Lead, PR and notification records are excluded; avoid placing personal contact information in other free-text records. Responses are suggestions for review. The app cannot send messages, publish content, spend money or alter live ad campaigns. Actual paid AI calls have not been verified in this release.

## Remaining phases

- OAuth and automatic sync for Analytics, Search Console, advertising, social, email, CRM and commerce platforms.
- Live crawling, Core Web Vitals, rank/keyword data providers, backlink discovery and scheduled monitoring.
- Social publishing, email delivery, external notifications and a general multi-step automation engine.
- Fully automated AI strategy/blueprint/persona creation, advanced report narratives, revenue attribution and fractional-CMO views.
- Multi-organization membership, production operations, retention/backup policy, and larger-dataset pagination.

Integration cards deliberately show **Not connected**. Scheduling a record does not publish or send it. The due-date timeline is an ordered schedule, not a drag-and-drop Gantt chart. Report PDF output uses the browser's print dialog.

## Project map

```text
app/                  Pages, styles, protected report route and API
components/           Workspace screens and accessible UI primitives
lib/                  Shared records, validation, insights, audits and server access
db/                   Drizzle schema and database binding
drizzle/              Initial SQL migration and metadata
preview/              Offline demo entry point
scripts/              Build, local migration and environment helpers
tests/                API integration checks
docs/                 Release verification and roadmap notes
```

Client-owned objects share one typed `entries` collection keyed by client and kind, with indexed relationships. Client profiles, organization memberships, daily analytics, rate limits and audit events have separate tables. This keeps the initial foundation compact while leaving room to split domain tables later.
