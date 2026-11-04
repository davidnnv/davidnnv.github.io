import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext.jsx';

export default function NotFoundPage() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container empty">
        <h1 className="section__title">{t('nf.title')}</h1>
        <p className="section__sub">{t('nf.sub')}</p>
        <Link to="/" className="btn btn--primary">{t('nf.home')}</Link>
      </div>
    </section>
  );
}
