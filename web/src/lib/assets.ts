/** Public assets with correct base path for GitHub Pages subpaths. */
export function assetUrl(path: string): string {
  const normalized = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${normalized}`
}
