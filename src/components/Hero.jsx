import { Link } from 'react-router-dom';
import ProductImage from './ProductImage.jsx';
import { displayName, getProductById } from '../data/products.js';
import { useI18n } from '../context/I18nContext.jsx';

const heroProduct = getProductById('air-jordan-1-retro-high-og');

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1 id="hero-title" className="hero__title">{t('hero.title1')}<br />{t('hero.title2')}</h1>
          <p className="hero__text">{t('hero.text')}</p>
          <div className="hero__actions">
            <Link to="/shop" className="btn btn--primary">{t('hero.shop')}</Link>
            <Link to="/new-arrivals" className="btn btn--ghost">{t('hero.new')}</Link>
          </div>
        </div>
        <div className="hero__media">
          <ProductImage src={heroProduct.images[0]} alt={displayName(heroProduct)} eager />
        </div>
      </div>
    </section>
  );
}
