export interface Env {
  RESEND_API_KEY: string
  CONTACT_TO_EMAIL: string
  CONTACT_FROM_EMAIL: string
  ALLOWED_ORIGINS: string
}

type ContactPayload = {
  name?: string
  phone?: string
  message?: string
  website?: string
}

function parseOrigins(value: string): string[] {
  return value
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
}

function corsHeaders(origin: string | null, allowed: string[]): HeadersInit {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }

  if (origin && allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Vary'] = 'Origin'
  }

  return headers
}

function json(
  data: unknown,
  status: number,
  extraHeaders: HeadersInit = {},
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...Object.fromEntries(new Headers(extraHeaders).entries()),
    },
  })
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function validatePayload(body: ContactPayload): string | null {
  if (body.website?.trim()) {
    return 'Spam detected'
  }

  const name = body.name?.trim() ?? ''
  const phone = body.phone?.trim() ?? ''

  if (name.length < 2 || name.length > 100) {
    return 'Укажите имя (от 2 символов)'
  }

  if (phone.length < 6 || phone.length > 30) {
    return 'Укажите корректный телефон'
  }

  const message = body.message?.trim() ?? ''
  if (message.length > 2000) {
    return 'Сообщение слишком длинное'
  }

  return null
}

async function sendEmail(env: Env, body: ContactPayload): Promise<void> {
  const name = body.name!.trim()
  const phone = body.phone!.trim()
  const message = body.message?.trim() || '—'

  const html = `
    <h2>Новая заявка с сайта клиники</h2>
    <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
    <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Комментарий:</strong></p>
    <p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>
  `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      subject: `Заявка с сайта — ${name}`,
      html,
      reply_to: env.CONTACT_TO_EMAIL,
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    console.error('Resend error:', response.status, detail)

    try {
      const parsed = JSON.parse(detail) as { message?: string }
      if (parsed.message) {
        throw new Error(parsed.message)
      }
    } catch (err) {
      if (err instanceof Error && err.message !== detail) {
        throw err
      }
    }

    throw new Error('Email send failed')
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowed = parseOrigins(env.ALLOWED_ORIGINS)
    const origin = request.headers.get('Origin')
    const cors = corsHeaders(origin, allowed)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Method not allowed' }, 405, cors)
    }

    if (!env.RESEND_API_KEY) {
      return json({ ok: false, error: 'Server not configured' }, 500, cors)
    }

    let body: ContactPayload
    try {
      body = await request.json()
    } catch {
      return json({ ok: false, error: 'Invalid JSON' }, 400, cors)
    }

    const validationError = validatePayload(body)
    if (validationError) {
      return json({ ok: false, error: validationError }, 400, cors)
    }

    try {
      await sendEmail(env, body)
      return json({ ok: true }, 200, cors)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Не удалось отправить заявку'
      return json({ ok: false, error: message }, 502, cors)
    }
  },
}
