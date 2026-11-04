import ProductGrid from '../components/ProductGrid.jsx';
import { newArrivals } from '../data/products.js';
import { useI18n } from '../context/I18nContext.jsx';

export default function NewArrivalsPage() {
  const { t } = useI18n();
  return (
    <section className="section page-top">
      <div className="container">
        <h1 className="section__title">{t('new.title')}</h1>
        <p className="section__sub">{t('new.sub')}</p>
        <div className="page-gap"><ProductGrid products={newArrivals} /></div>
      </div>
    </section>
  );
}
