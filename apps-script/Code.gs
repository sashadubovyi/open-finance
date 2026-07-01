/**
 * Финансовый план — Lead capture proxy.
 *
 * Deployed as a Google Apps Script Web App, this script receives the quiz
 * lead payload from the React frontend and forwards it to a Telegram chat
 * via the Bot API. Routing through Apps Script (Google infrastructure)
 * avoids direct browser calls to api.telegram.org, which can be blocked
 * or throttled for end users in Russia.
 *
 * SETUP:
 * 1. Create a Telegram bot via @BotFather and copy its token.
 * 2. Get your target chat/group/channel ID (e.g. message @userinfobot,
 *    or add the bot to a group and read the chat id from getUpdates).
 * 3. Open Extensions > Apps Script Properties (Project Settings > Script
 *    Properties) and add two properties:
 *      TELEGRAM_BOT_TOKEN = <your bot token>
 *      TELEGRAM_CHAT_ID   = <your chat id>
 *    (Keeping secrets in Script Properties instead of hardcoding them
 *    keeps the token out of the source if this file is ever shared.)
 * 4. Deploy > New deployment > Web app.
 *      Execute as: Me
 *      Who has access: Anyone
 * 5. Copy the deployment URL into the frontend's VITE_GAS_WEB_APP_URL.
 */

function doPost(e) {
  try {
    var data = parseRequestBody(e)
    var message = buildTelegramMessage(data)
    sendTelegramMessage(message)

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, status: 'Finance Plan lead proxy is running' })
  ).setMimeType(ContentService.MimeType.JSON)
}

function parseRequestBody(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Empty request body')
  }
  return JSON.parse(e.postData.contents)
}

function buildTelegramMessage(data) {
  var name = escapeValue(data.name)
  var phone = escapeValue(data.phone)
  var email = escapeValue(data.email)
  var goal = escapeValue(data.goal)
  var time = escapeValue(data.time)
  var yieldExpectation = escapeValue(data.yieldExpectation)
  var budget = escapeValue(data.budget)

  return (
    '=== НОВАЯ ЗАЯВКА: ФИНАНСОВЫЙ ПЛАН ===\n' +
    'Имя: ' + name + '\n' +
    'Телефон: ' + phone + '\n' +
    'E-mail: ' + email + '\n' +
    '---------------------------------\n' +
    'Цель доходности: ' + goal + '\n' +
    'Время на инвестиции: ' + time + '\n' +
    'Ожидаемая прибыль: ' + yieldExpectation + '\n' +
    'Стартовый бюджет: ' + budget
  )
}

function escapeValue(value) {
  if (value === undefined || value === null || value === '') return 'не указано'
  return String(value)
}

function sendTelegramMessage(text) {
  var props = PropertiesService.getScriptProperties()
  var botToken = props.getProperty('TELEGRAM_BOT_TOKEN')
  var chatId = props.getProperty('TELEGRAM_CHAT_ID')

  if (!botToken || !chatId) {
    throw new Error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID script property is missing')
  }

  var url = 'https://api.telegram.org/bot' + botToken + '/sendMessage'

  var response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
    muteHttpExceptions: true,
  })

  var responseBody = JSON.parse(response.getContentText())
  if (!responseBody.ok) {
    throw new Error('Telegram API error: ' + response.getContentText())
  }
}
