import { advantages } from '../data/content'
import { useInView } from '../hooks/useInView'

export function Advantages() {
  const { ref, visible } = useInView()

  return (
    <section
      id="advantages"
      className="section advantages"
      ref={ref}
    >
      <div className="container">
        <header className={`section-header ${visible ? 'is-visible' : ''}`}>
          <p className="section-eyebrow">Преимущества</p>
          <h2 className="section-title">Почему пациенты выбирают нас</h2>
        </header>

        <div className="advantages__grid">
          {advantages.map((item, i) => (
            <article
              key={item.title}
              className={`advantage-card ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="advantage-card__icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="advantage-card__title">{item.title}</h3>
              <p className="advantage-card__text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
