import { clinic } from '../data/content'
import { useInView } from '../hooks/useInView'
import { assetUrl } from '../lib/assets'
export function Hero() {
  const { ref, visible } = useInView()

  return (
    <section className="hero" ref={ref}>
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />

      <div className="container hero__grid">
        <div className={`hero__content ${visible ? 'is-visible' : ''}`}>
          <p className="hero__eyebrow">Стоматология в Ульяновске</p>
          <h1 className="hero__title">
            Клиника
            <em> доктора Селезнёвой</em>
          </h1>
          <p className="hero__lead">
            Мы рады вас приветствовать. Душевный подход, внимание к каждому
            зубу и комфорт в кресле стоматолога.
          </p>

          <div className="hero__cta">
            <a href="#contact" className="btn btn--primary">
              Записаться на приём
            </a>
            <a href={clinic.phoneHref} className="btn btn--ghost">
              {clinic.phone}
            </a>
          </div>

          <dl className="hero__meta">
            <div>
              <dt>Адрес</dt>
              <dd>
                {clinic.address}
                <br />
                {clinic.addressDetail}
              </dd>
            </div>
            <div>
              <dt>Режим работы</dt>
              <dd>{clinic.scheduleWeekdays}</dd>
            </div>
          </dl>
        </div>

        <div
          className={`hero__visual ${visible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '120ms' }}
        >
          <div className="hero__image-frame">
            <img
              src={assetUrl('/images/hero.jpg')}
              alt="Интерьер стоматологической клиники"
              className="hero__image"
            />
          </div>
          <div className="hero__card">
            <span className="hero__card-label">Без страха и спешки</span>
            <p className="hero__card-text">
              Индивидуальный план лечения после консультации
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
