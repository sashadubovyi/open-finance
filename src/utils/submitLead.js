// Deployed Apps Script Web App proxy (apps-script/Code.gs). Not a secret —
// it's designed to be called directly from the browser. Overridable via
// VITE_GAS_WEB_APP_URL for staging/alternate deployments.
const DEFAULT_GAS_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbykuXmlSevlvTpbnlWpf8gkPBMD5WexBUML06fDqWl_eUHVWjrjeQ6tb1J6GpXbbx7lXA/exec'

const GAS_WEB_APP_URL = import.meta.env.VITE_GAS_WEB_APP_URL || DEFAULT_GAS_WEB_APP_URL

/**
 * Sends the lead payload to the Google Apps Script Web App proxy, which
 * forwards it to Telegram. The request is sent as text/plain with mode
 * "no-cors" on purpose: Apps Script Web Apps don't return proper CORS
 * preflight responses, so a text/plain "simple request" is the only
 * reliable way to call them directly from the browser. The response is
 * opaque (unreadable), so we treat "no network error" as success.
 */
export async function submitLead(payload) {
  if (!GAS_WEB_APP_URL) {
    console.warn('VITE_GAS_WEB_APP_URL is not configured — lead was not sent.')
    return { ok: false }
  }

  await fetch(GAS_WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })

  return { ok: true }
}
