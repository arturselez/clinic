# Деплой: GitHub Pages + форма через Cloudflare Worker

Сайт — **статика на GitHub Pages**.  
Форма — **Cloudflare Worker** + **Resend**.  
Секреты Resend **никогда не попадают** в репозиторий и не попадают в браузер.

---

## Схема безопасности (Resend)

| Данные | Где хранить | Попадает в git? | Видно в браузере? |
|--------|-------------|-----------------|-------------------|
| `RESEND_API_KEY` | Cloudflare Secret (`wrangler secret put`) | **Нет** | **Нет** |
| `CONTACT_TO_EMAIL` | `wrangler.toml` или Cloudflare vars | Да, если в toml | **Нет** |
| `CONTACT_FROM_EMAIL` | `wrangler.toml` | Да | **Нет** |
| `VITE_CONTACT_API_URL` | GitHub Secret + `web/.env` локально | **Нет** (только example) | **Да** (это нормально — просто URL API) |

**Главное правило:** API-ключ Resend только на сервере (Worker).  
На GitHub Pages лежит только собранный JS с URL воркера — без ключей и без почты получателя.

Локально секреты — в файлах, которые **не коммитятся**:
- `web/.env`
- `server/contact-form/.dev.vars`

---

## Шаг 1. Репозиторий на GitHub

```powershell
cd C:\Users\Ilya\Desktop\CLINIC
git init
git add .
git commit -m "Initial clinic site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Перед `git add` убедитесь, что **нет** в индексе:
- `web/.env`
- `server/contact-form/.dev.vars`

---

## Шаг 2. Cloudflare Worker (форма → email)

```powershell
cd server/contact-form
npm install
```

### 2.1. Настройте `wrangler.toml`

```toml
[vars]
CONTACT_TO_EMAIL = "artur.seleznev73@mail.ru"
CONTACT_FROM_EMAIL = "onboarding@resend.dev"
ALLOWED_ORIGINS = "http://localhost:5173,https://YOUR-USERNAME.github.io"
```

Если будет свой домен — добавьте его в `ALLOWED_ORIGINS` через запятую.

### 2.2. Секрет Resend (не в git!)

```powershell
npx wrangler secret put RESEND_API_KEY
# вставьте ключ re_...
```

### 2.3. Деплой Worker

```powershell
npm run deploy
```

Скопируйте URL вида: `https://clinic-contact-form.xxxxx.workers.dev`

---

## Шаг 3. GitHub Pages

### 3.1. Секрет репозитория

GitHub → **Settings → Secrets and variables → Actions → New repository secret**

| Name | Value |
|------|-------|
| `VITE_CONTACT_API_URL` | `https://clinic-contact-form.xxxxx.workers.dev` |

### 3.2. Включить Pages

**Settings → Pages → Build and deployment:**
- Source: **GitHub Actions**

После push в `main` workflow `.github/workflows/deploy-pages.yml` соберёт и задеплоит сайт.

URL: `https://YOUR-USERNAME.github.io/YOUR-REPO/`

### 3.3. Обновить CORS на Worker

После первого деплоя добавьте точный URL Pages в `ALLOWED_ORIGINS` и снова:

```powershell
cd server/contact-form
npm run deploy
```

---

## Шаг 4. Resend для продакшена

**Тест:** `onboarding@resend.dev` → письма только на email аккаунта Resend.

**Продакшен:**
1. [resend.com/domains](https://resend.com/domains) → добавить домен
2. Подтвердить DNS
3. В `wrangler.toml`: `CONTACT_FROM_EMAIL = "noreply@ваш-домен.ru"`
4. `npm run deploy`

---

## Локальная сборка «как на Pages»

```powershell
cd web
# .env:
# VITE_CONTACT_API_URL=https://....workers.dev
# GITHUB_PAGES_BASE=/YOUR-REPO/

$env:GITHUB_PAGES_BASE="/YOUR-REPO/"
npm run build
npm run preview
```

---

## Чеклист перед публикацией

- [ ] `web/.env` и `.dev.vars` не в git
- [ ] Worker задеплоен, `RESEND_API_KEY` через secret
- [ ] `ALLOWED_ORIGINS` содержит URL GitHub Pages
- [ ] GitHub Secret `VITE_CONTACT_API_URL` задан
- [ ] Pages включены (GitHub Actions)
- [ ] Форма на живом сайте отправляет заявку
- [ ] `/works` открывается по прямой ссылке (SPA fallback `404.html` создаётся при build)

---

## Свой домен на GitHub Pages

1. Settings → Pages → Custom domain
2. В workflow измените `GITHUB_PAGES_BASE` на `/` (или задайте переменную репозитория)
3. Добавьте домен в `ALLOWED_ORIGINS` Worker

---

## Что уже настроено в проекте

- `vite.config.ts` — base path для project Pages + `404.html` для SPA
- `BrowserRouter` — basename для роутов `/works`
- `assetUrl()` — картинки с правильным путём
- GitHub Actions workflow в `.github/workflows/deploy-pages.yml`
