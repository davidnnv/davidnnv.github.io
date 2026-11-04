import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import CartButton from './CartButton.jsx';
import Preferences from './Preferences.jsx';
import { useI18n } from '../context/I18nContext.jsx';

const links = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/shop', key: 'nav.shop' },
  { to: '/new-arrivals', key: 'nav.new' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="header">
      <div className="container header__inner">
        <button type="button" className="menu-btn" aria-expanded={open} aria-controls="primary-nav"
          aria-label={open ? t('a11y.menuClose') : t('a11y.menuOpen')} onClick={() => setOpen((v) => !v)}>
          <span className={`menu-btn__bars${open ? ' is-open' : ''}`} />
        </button>
        <Logo />
        <nav id="primary-nav" className={`nav${open ? ' is-open' : ''}`} aria-label={t('a11y.primaryNav')}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav__link">{t(l.key)}</NavLink>
          ))}
        </nav>
        <div className="header__tools">
          <Preferences />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
