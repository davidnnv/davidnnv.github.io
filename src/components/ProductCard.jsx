import { Link } from 'react-router-dom';
import ProductImage from './ProductImage.jsx';
import { displayName, formatPrice } from '../data/products.js';
import { useI18n } from '../context/I18nContext.jsx';

export default function ProductCard({ product }) {
  const { t } = useI18n();
  const { id, name, brand, price, images, sizes, isNew } = product;
  return (
    <article className="card">
      <Link to={`/product/${id}`} className="card__link">
        <div className="card__media">
          {isNew && <span className="badge">{t('card.new')}</span>}
          <ProductImage src={images[0]} alt={displayName(product)} />
        </div>
        <div className="card__body">
          <p className="card__brand">{brand}</p>
          <h3 className="card__name">{name}</h3>
          <p className="card__sizes">EU {sizes[0]}–{sizes[sizes.length - 1]}</p>
          <p className="card__price">{formatPrice(price)}</p>
        </div>
      </Link>
    </article>
  );
}
