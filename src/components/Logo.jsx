import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext.jsx';

export default function Logo({ inverted = false }) {
  const { t } = useI18n();
  return (
    <Link to="/" className={`logo${inverted ? ' logo--inverted' : ''}`} aria-label={t('a11y.homeLink')}>
      <img src="/images/logo.png" alt="" className="logo__img" width="900" height="399" />
      <span className="logo__mk" aria-hidden="true">MK</span>
    </Link>
  );
}
