import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { STORE } from '../config/store.js';
import { useI18n } from '../context/I18nContext.jsx';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <Logo inverted />
          <p className="footer__tag">{t('footer.tag')}</p>
        </div>
        <nav aria-label={t('a11y.footerNav')} className="footer__col">
          <h2 className="footer__h">{t('footer.store')}</h2>
          <Link to="/shop">{t('nav.shop')}</Link>
          <Link to="/new-arrivals">{t('nav.new')}</Link>
        </nav>
        <div className="footer__col">
          <h2 className="footer__h">{t('footer.contact')}</h2>
          <a href={`mailto:${STORE.email}`}>{STORE.email}</a>
        </div>
        <div className="footer__col">
          <h2 className="footer__h">{t('footer.follow')}</h2>
          <a href={STORE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <p className="container footer__legal">{t('footer.legal', { year: new Date().getFullYear() })}</p>
    </footer>
  );
}
