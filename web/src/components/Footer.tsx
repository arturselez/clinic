import { clinic } from '../data/content'
import { assetUrl } from '../lib/assets'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__main">
          <div className="footer__brand">
            <img src={assetUrl('/images/logo.png')} alt="" className="footer__logo" />
            <p>{clinic.name}</p>
          </div>
          <div className="footer__legal">
            <p className="footer__copy">© {clinic.footerLegal}</p>
            <p className="footer__license">{clinic.footerLicense}</p>
          </div>
        </div>
        <a href={clinic.phoneHref} className="footer__phone">
          {clinic.phone}
        </a>
      </div>
    </footer>
  )
}