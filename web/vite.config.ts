import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** GitHub Pages project site: /repo-name/  Custom domain or user site: / */
const base = process.env.GITHUB_PAGES_BASE ?? '/'

function ghPagesSpaFallback(): Plugin {
  return {
    name: 'gh-pages-spa-fallback',
    closeBundle() {
      const outDir = join(process.cwd(), 'dist')
      copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), ghPagesSpaFallback()],
})
