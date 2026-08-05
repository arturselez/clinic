import { useState } from 'react'
import type { FormEvent } from 'react'
import { clinic } from '../data/content'
import { useInView } from '../hooks/useInView'

const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL as string | undefined

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const { ref, visible } = useInView()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!contactApiUrl) {
      setErrorMessage('Форма временно недоступна. Позвоните нам по телефону.')
      setStatus('error')
      return
    }

    const form = e.currentTarget
    const formData = new FormData(form)

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch(contactApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      })

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || 'Не удалось отправить заявку')
      }

      form.reset()
      setStatus('success')
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Не удалось отправить заявку. Попробуйте позже.',
      )
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="section contact"
      ref={ref}
    >
      <div className="container contact__grid">
        <div className={`contact__info ${visible ? 'is-visible' : ''}`}>
          <p className="section-eyebrow">Контакты</p>
          <h2 className="section-title">Запишитесь на консультацию</h2>
          <p className="contact__text">
            Оставьте заявку — мы перезвоним и подберём удобное время приёма.
          </p>

          <ul className="contact__details">
            <li>
              <span className="contact__label">Телефон</span>
              <a href={clinic.phoneHref}>{clinic.phone}</a>
            </li>
            <li>
              <span className="contact__label">Адрес</span>
              <span>
                {clinic.address}, {clinic.addressDetail}
              </span>
            </li>
            <li>
              <span className="contact__label">Режим</span>
              <span>
                {clinic.scheduleWeekdays}
                <br />
                {clinic.scheduleWeekend}
              </span>
            </li>
          </ul>
        </div>

        <div
          className={`contact__form-wrap ${visible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '100ms' }}
        >
          {status === 'success' ? (
            <div className="contact__success">
              <h3>Заявка отправлена</h3>
              <p>Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <label className="contact__honeypot" aria-hidden="true">
                <span>Сайт</span>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <label>
                <span>Имя</span>
                <input
                  type="text"
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  placeholder="Как вас зовут?"
                  disabled={status === 'loading'}
                />
              </label>
              <label>
                <span>Телефон</span>
                <input
                  type="tel"
                  name="phone"
                  required
                  minLength={6}
                  maxLength={30}
                  placeholder="+7 (___) ___-__-__"
                  disabled={status === 'loading'}
                />
              </label>
              <label>
                <span>Комментарий</span>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={2000}
                  placeholder="Что беспокоит или когда вам удобно?"
                  disabled={status === 'loading'}
                />
              </label>
              {status === 'error' && errorMessage && (
                <p className="contact__error" role="alert">
                  {errorMessage}
                </p>
              )}
              <p className="contact__consent">
                Отправляя форму, вы соглашаетеся на обработку персональных данных.
              </p>
              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Отправка…' : 'Отправить заявку'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
