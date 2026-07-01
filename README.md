# Финансовый план — Quiz Landing Page

Premium, mobile-first quiz landing page for lead generation, built with React + Vite + Tailwind CSS. Leads are sent to Telegram through a Google Apps Script proxy (`apps-script/Code.gs`) to avoid direct browser calls to the Telegram API.

## Stack

- React 18 + Vite
- Tailwind CSS
- lucide-react icons
- No animation libraries — all transitions use `transform`/`opacity` for 60fps on low-end mobile devices

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` to `.env` and set the Apps Script Web App URL:

```bash
cp .env.example .env
```

```
VITE_GAS_WEB_APP_URL=https://script.google.com/macros/s/XXXXX/exec
```

## Telegram proxy (Google Apps Script)

The full standalone script lives in `apps-script/Code.gs`.

1. Go to [script.google.com](https://script.google.com) → New project, paste in `Code.gs` (and `appsscript.json` manifest settings if desired).
2. Create a Telegram bot with [@BotFather](https://t.me/BotFather) and copy the bot token.
3. Get the target chat ID (message [@userinfobot](https://t.me/userinfobot), or add the bot to a group/channel and inspect `getUpdates`).
4. In the Apps Script editor: **Project Settings → Script Properties**, add:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
5. **Deploy → New deployment → Web app**
   - Execute as: `Me`
   - Who has access: `Anyone`
6. Copy the deployment URL into `VITE_GAS_WEB_APP_URL`.

The frontend sends the payload as `text/plain` with `mode: "no-cors"` — this is intentional. Apps Script Web Apps don't support CORS preflight requests, so a `text/plain` "simple request" is the reliable way to call them from the browser. The response is opaque; submission is treated as successful once the request is sent without a network error.

## Deploying to Firebase Hosting

```bash
npm run build
firebase login
firebase init hosting   # if not already initialized; point it at this repo, public dir "dist"
firebase deploy
```

`firebase.json` is already configured to serve `dist/` with SPA rewrites.
