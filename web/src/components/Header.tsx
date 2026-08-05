import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { clinic, navItems } from '../data/content'
import { assetUrl } from '../lib/assets'

function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string
  children: ReactNode
  className: string
  onClick?: () => void
}) {
  const isInternal = href.startsWith('/')

  if (isInternal) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu-open' : ''}`}>
      <div className="header__inner container">
        <Link to="/" className="header__brand" aria-label="На главную">
          <img src={assetUrl('/images/logo.png')} alt="" className="header__logo" />
          <span className="header__brand-text">{clinic.shortName}</span>
        </Link>

        <nav className="header__nav" aria-label="Основная навигация">
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} className="header__nav-link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a href={clinic.phoneHref} className="header__phone">
            {clinic.phone}
          </a>
          <Link to="/#contact" className="btn btn--primary btn--sm">
            Записаться
          </Link>
        </div>

        <button
          type="button"
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
          aria-label="Меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={`header__mobile ${menuOpen ? 'header__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="header__mobile-backdrop" aria-hidden="true" />
        <div className="header__mobile-panel">
        <nav aria-label="Мобильная навигация">
          <ul className="header__mobile-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="header__mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <a href={clinic.phoneHref} className="header__mobile-phone">
          {clinic.phone}
        </a>
        <Link
          to="/#contact"
          className="btn btn--primary"
          onClick={() => setMenuOpen(false)}
        >
          Записаться на приём
        </Link>
        </div>
      </div>
    </header>
  )
}
