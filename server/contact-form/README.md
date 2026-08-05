# Contact form API (Cloudflare Worker)

Serverless-функция для формы записи. Сайт может лежать на **GitHub Pages**, а эта функция — отдельно на **Cloudflare Workers** (бесплатный тариф).

## 1. Регистрация Resend

1. Создайте аккаунт на [resend.com](https://resend.com)
2. Получите API-ключ
3. Для теста можно отправлять с `onboarding@resend.dev` только на **ваш** email
4. Для продакшена — подключите свой домен в Resend и укажите `CONTACT_FROM_EMAIL` вида `noreply@ваш-домен.ru`

## 2. Установка и деплой

```bash
cd server/contact-form
npm install
```

Отредактируйте `wrangler.toml`:

```toml
[vars]
CONTACT_TO_EMAIL = "clinic@example.com"        # куда приходят заявки
CONTACT_FROM_EMAIL = "onboarding@resend.dev"   # или noreply@ваш-домен.ru
ALLOWED_ORIGINS = "http://localhost:5173,https://username.github.io,https://ваш-домен.ru"
```

Секрет:

```bash
npx wrangler secret put RESEND_API_KEY
```

Деплой:

```bash
npm run deploy
```

После деплоя вы получите URL вида:
`https://clinic-contact-form.<your-subdomain>.workers.dev`

## 3. Подключение к сайту

В папке `web/` создайте `.env`:

```env
VITE_CONTACT_API_URL=https://clinic-contact-form.<your-subdomain>.workers.dev
```

Пересоберите сайт:

```bash
cd web
npm run build
```

## 4. GitHub Pages

Сайт деплоится как статика (`web/dist`). Форма шлёт POST на Worker — это работает с любого хостинга.

Не забудьте добавить URL GitHub Pages в `ALLOWED_ORIGINS` в `wrangler.toml` и снова выполнить `npm run deploy`.

## Локальная разработка

```bash
# Терминал 1 — API
cd server/contact-form
cp .dev.vars.example .dev.vars   # заполните значения
npm run dev

# Терминал 2 — сайт
cd web
# .env: VITE_CONTACT_API_URL=http://localhost:8787
npm run dev
```
