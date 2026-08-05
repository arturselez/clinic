import { Link } from 'react-router-dom'
import { portfolioPreview } from '../data/content'
import { useInView } from '../hooks/useInView'

export function Portfolio() {
  const { ref, visible } = useInView()

  return (
    <section
      id="portfolio"
      className="section portfolio portfolio--compact"
      ref={ref}
    >
      <div className="container portfolio__inner">
        <header className={`portfolio__header ${visible ? 'is-visible' : ''}`}>
          <div>
            <p className="section-eyebrow">Наши работы</p>
            <h2 className="section-title">Результаты лечения</h2>
          </div>
          <Link to="/works" className="portfolio__link">
            Все работы →
          </Link>
        </header>

        <div className="portfolio__grid">
          {portfolioPreview.map((item, i) => (
            <Link
              to="/works"
              key={item.title}
              className={`portfolio__item portfolio__item--link ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="portfolio__image-wrap">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <span className="portfolio__caption">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
