import { services } from '../data/content'
import { useInView } from '../hooks/useInView'

export function Services() {
  const { ref, visible } = useInView()

  return (
    <section
      id="services"
      className="section services"
      ref={ref}
    >
      <div className="container">
        <header className={`section-header ${visible ? 'is-visible' : ''}`}>
          <p className="section-eyebrow">Услуги</p>
          <h2 className="section-title">Лечебная и эстетическая стоматология</h2>
          <p className="section-desc">
            Разные виды лечения — от диагностики до имплантации
          </p>
        </header>

        <div className="services__bento">
          {services.map((service, i) => (
            <article
              key={service.title}
              className={`service-card service-card--${i + 1} ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <h3 className="service-card__title">{service.title}</h3>
              <ul className="service-card__list">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
