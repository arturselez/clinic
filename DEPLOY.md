# Деплой: GitHub Pages

Сайт — **статика на GitHub Pages**.

---

## Шаг 1. Репозиторий на GitHub

```powershell
cd "C:\Users\Mi\Desktop\CLINIC (2)\CLINIC"
git init
git add .
git commit -m "Initial clinic site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Перед `git add` убедитесь, что **нет** в индексе:
- `web/.env`

---

## Шаг 2. GitHub Pages

**Settings → Pages → Build and deployment:**
- Source: **GitHub Actions**

После push в `main` workflow `.github/workflows/deploy-pages.yml` соберёт и задеплоит сайт.

URL: `https://YOUR-USERNAME.github.io/YOUR-REPO/`

---

## Локальная сборка «как на Pages»

```powershell
cd web
# .env:
# GITHUB_PAGES_BASE=/YOUR-REPO/

$env:GITHUB_PAGES_BASE="/YOUR-REPO/"
npm run build
npm run preview
```

---

## Чеклист перед публикацией

- [ ] `web/.env` не в git
- [ ] Pages включены (GitHub Actions)
- [ ] `/works` открывается по прямой ссылке (SPA fallback `404.html` создаётся при build)

---

## Свой домен на GitHub Pages

1. Settings → Pages → Custom domain
2. В workflow измените `GITHUB_PAGES_BASE` на `/` (или задайте переменную репозитория)

---

## Что уже настроено в проекте

- `vite.config.ts` — base path для project Pages + `404.html` для SPA
- `BrowserRouter` — basename для роутов `/works`
- `assetUrl()` — картинки с правильным путём
- GitHub Actions workflow в `.github/workflows/deploy-pages.yml`
