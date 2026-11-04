import { Link } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';
import { useI18n } from '../context/I18nContext.jsx';

export default function ProductSection({ id, title, subtitle, products, linkTo, linkLabel, muted = false }) {
  const { t } = useI18n();
  return (
    <section className={`section${muted ? ' section--muted' : ''}`} aria-labelledby={id}>
      <div className="container">
        <div className="section__head">
          <div>
            <h2 id={id} className="section__title">{title}</h2>
            {subtitle && <p className="section__sub">{subtitle}</p>}
          </div>
          {linkTo && <Link to={linkTo} className="text-link">{linkLabel || t('home.viewAll')} →</Link>}
        </div>
        <div className="grid">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
