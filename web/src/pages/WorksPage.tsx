import { Link } from 'react-router-dom'
import { BeforeAfterSlider } from '../components/BeforeAfterSlider'
import { ImageSlider } from '../components/ImageSlider'
import { clinic } from '../data/content'
import { workSections } from '../data/works'

export function WorksPage() {
  return (
    <div className="works-page">
      <section className="works-hero">
        <div className="container">
          <p className="section-eyebrow">Портфолио</p>
          <h1 className="works-hero__title">Наши работы</h1>
          <p className="works-hero__lead">
            Реальные результаты лечения и эстетической стоматологии в клинике
            доктора Селезнёвой.
          </p>
          <Link to="/" className="works-hero__back">
            ← На главную
          </Link>
        </div>
      </section>

      {workSections.map((section) => (
        <section key={section.id} className="works-section" id={section.id}>
          <div className="container">
            <h2 className="works-section__title">{section.title}</h2>

            {section.type === 'grid' && (
              <div className="works-grid">
                {section.images.map((src, i) => (
                  <figure key={src} className="works-grid__item">
                    <img src={src} alt={`${section.title} — ${i + 1}`} loading="lazy" />
                  </figure>
                ))}
              </div>
            )}

            {section.type === 'slider' && (
              <ImageSlider images={section.images} title={section.title} />
            )}

            {section.type === 'beforeafter' && (
              <BeforeAfterSlider
                before={section.before}
                after={section.after}
                beforeLabel={section.beforeLabel}
                afterLabel={section.afterLabel}
              />
            )}
          </div>
        </section>
      ))}

      <section className="works-cta">
        <div className="container works-cta__inner">
          <h2 className="works-cta__title">Хотите такой же результат?</h2>
          <p className="works-cta__text">
            Запишитесь на консультацию — врач оценит состояние зубов и предложит
            план лечения.
          </p>
          <div className="works-cta__actions">
            <Link to="/#contact" className="btn btn--primary">
              Записаться на приём
            </Link>
            <a href={clinic.phoneHref} className="btn btn--ghost">
              {clinic.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
