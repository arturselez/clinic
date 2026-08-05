import { clinic } from '../data/content'
import { useInView } from '../hooks/useInView'

export function About() {
  const { ref, visible } = useInView()

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <div className={`about__grid ${visible ? 'is-visible' : ''}`}>
          <div className="about__text">
            <p className="section-eyebrow">О клинике</p>
            <h2 className="section-title">
              Внимание к деталям и забота о каждом пациенте
            </h2>
            <blockquote className="about__quote">{clinic.motto}</blockquote>
            <p className="about__body">
              {clinic.name} — частная практика в Ульяновске. Мы
              сочетаем современные методы диагностики и лечения с тёплым,
              персональным вниманием к каждому пациенту.
            </p>
          </div>

          <div className="about__facts">
            <article className="fact-card">
              <span className="fact-card__value">{clinic.city}</span>
              <span className="fact-card__label">Город</span>
            </article>
            <article className="fact-card">
              <span className="fact-card__value">9:00–17:00</span>
              <span className="fact-card__label">Пн–Пт</span>
            </article>
            <article className="fact-card fact-card--accent">
              <span className="fact-card__value">По записи</span>
              <span className="fact-card__label">Позднее время</span>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
