import { useState } from 'react'
import { clinic, prices } from '../data/content'
import { useInView } from '../hooks/useInView'

export function Prices() {
  const { ref, visible } = useInView()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="prices"
      className="section prices"
      ref={ref}
    >
      <div className="container">
        <header className={`section-header ${visible ? 'is-visible' : ''}`}>
          <p className="section-eyebrow">Цены</p>
          <h2 className="section-title">Прозрачная стоимость услуг</h2>
          <p className="section-desc">{clinic.priceNote}</p>
        </header>

        <div className={`prices__list ${visible ? 'is-visible' : ''}`}>
          {prices.map((group, index) => {
            const isOpen = openIndex === index
            return (
              <div key={group.category} className="price-group">
                <button
                  type="button"
                  className="price-group__trigger"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                >
                  <span>{group.category}</span>
                  <span className="price-group__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  className="price-group__panel"
                  hidden={!isOpen}
                >
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
