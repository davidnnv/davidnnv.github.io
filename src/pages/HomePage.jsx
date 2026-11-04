import Hero from '../components/Hero.jsx';
import ProductSection from '../components/ProductSection.jsx';
import PreorderNotice from '../components/PreorderNotice.jsx';
import { featuredProducts, newArrivals, bestSellers } from '../data/products.js';
import { useI18n } from '../context/I18nContext.jsx';

export default function HomePage() {
  const { t } = useI18n();
  return (
    <>
      <Hero />
      <ProductSection id="featured" title={t('home.featured')} subtitle={t('home.featuredSub')}
        products={featuredProducts.slice(0, 4)} linkTo="/shop" linkLabel={t('home.shopAll')} />
      <ProductSection id="new" title={t('home.new')} subtitle={t('home.newSub')}
        products={newArrivals.slice(0, 4)} linkTo="/new-arrivals" muted />
      <ProductSection id="best" title={t('home.best')} subtitle={t('home.bestSub')}
        products={bestSellers.slice(0, 4)} linkTo="/shop" linkLabel={t('home.shopAll')} />
      <PreorderNotice />
    </>
  );
}
