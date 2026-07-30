# Célere — Smart Home Landing Page

Conversion-focused landing page for **Célere**, a Brazilian residential automation company. Built to turn paid and organic traffic into qualified leads, with the whole capture-to-notification path automated so no lead waits on someone checking an inbox.

**Live:** https://celere.netlify.app · **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS

---

## Why it exists

Célere sells a considered purchase — smart-home installations are specified, quoted and negotiated, not bought off a shelf. The site therefore optimises for one thing: getting a qualified conversation started, with enough context captured up front that the first reply can already be useful.

Design direction is Art Déco geometry over a dark, high-contrast base, aiming at the premium end of the market rather than the commodity installer look.

## Features

- **Single-scroll narrative** — hero → services → differentiators → packages → social proof → contact, each section a self-contained component under `src/components/`.
- **Qualifying lead form** — captures name, WhatsApp, city/state, stage of the build (`situação`), and automation priorities, so the first contact is informed instead of a cold "hi, tell me what you need".
- **Instant multi-channel notification** — every submission fans out to a Google Sheets webhook (CRM of record), a WhatsApp push, and a Telegram push.
- **Video hero** with scroll-triggered reveal animations (`FadeIn`), tuned to fire early on mobile so content is never blank on first paint.
- **Responsive and SEO-ready** — Open Graph metadata, semantic markup, accessible contrast ratios.

## Architecture notes

### Lead pipeline: parallel dispatch to survive the serverless timeout

`src/app/api/submit-lead/route.ts` is the interesting part. Three side effects have to happen on submit, and Google Sheets is by far the slowest of them. Awaiting them in sequence meant the Netlify function hit its 10-second ceiling and died *before* firing the notifications — the exact failure mode you least want, since the lead is silently lost.

The fix is to kick off all three as unawaited promises and settle them together:

```ts
await Promise.allSettled([sheetsTask, callMeBotTask, telegramTask]);
```

`allSettled` rather than `all` matters here: a lead is still a lead if the Telegram bot is down. One failing channel must not reject the request and lose the other two.

Notification is deliberately doubled up — WhatsApp via CallMeBot as the primary, Telegram as the fallback, because CallMeBot is a free third-party relay with no delivery guarantee. Telegram tokens get `.replace(/["'\s]/g, "")`'d on read, since env vars pasted into a hosting dashboard routinely arrive wrapped in stray quotes.

### Input hygiene

Every field is length-clamped server-side via `strSafe()` before it touches a webhook. The form is public and unauthenticated, so this is the boundary where untrusted input stops being arbitrary — it caps payload size and keeps script-y junk out of the downstream spreadsheet and chat messages.

### Graceful degradation

Each integration is behind an env-var check. With no secrets configured the route still returns `200` and reports its state, so the form works in local development and a broken/missing integration degrades instead of erroring.

## Running locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Opens on http://localhost:3000.

## Configuration

All integrations are optional — set only what you need.

| Variable | Purpose |
| --- | --- |
| `GOOGLE_SHEETS_WEBHOOK` | Google Apps Script endpoint that appends the lead to a sheet |
| `CALLMEBOT_API_KEY` | CallMeBot key for the WhatsApp notification |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token (fallback notification channel) |
| `TELEGRAM_CHAT_ID` | Destination chat for the Telegram notification |

## Deployment

Deployed on Netlify with automatic builds from `main`. Vercel and any Node host work unchanged (`npm run build && npm start`).

---

Built and maintained by [Leonardo Serra Crespilho](https://www.linkedin.com/in/leonardocrespilho/).
