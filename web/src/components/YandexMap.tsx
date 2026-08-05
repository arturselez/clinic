import { useEffect, useRef } from 'react'

const MAP_SCRIPT_SRC =
  'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A1519aa2f2493a65a67e98e435e90ee053b9faf2534426e85eb8073a757a291f8&width=100%25&height=400&lang=ru_RU&scroll=true'
export function YandexMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.async = true
    script.src = MAP_SCRIPT_SRC
    container.appendChild(script)

    return () => {
      container.replaceChildren()
    }
  }, [])

  return (
    <section className="map-section" aria-label="Карта проезда">
      <div className="map-section__embed" ref={containerRef} />
    </section>
  )
}
