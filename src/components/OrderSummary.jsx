import ProductImage from './ProductImage.jsx';
import { displayName, formatPrice } from '../data/products.js';
import { useI18n } from '../context/I18nContext.jsx';

// items: [{ key, name, brand, size, qty, price, image }]
export default function OrderSummary({ items, total, title }) {
  const { t } = useI18n();
  const heading = title || t('sum.title');
  return (
    <section className="summary" aria-label={heading}>
      <h2 className="summary__title">{heading}</h2>
      <ul className="summary__list">
        {items.map((i) => (
          <li key={i.key} className="summary__item">
            <div className="summary__thumb"><ProductImage src={i.image} alt="" /></div>
            <div className="summary__info">
              <p className="summary__name">{displayName(i)}</p>
              <p className="summary__meta">{t('sum.meta', { size: i.size, qty: i.qty })}</p>
            </div>
            <p className="summary__price">{formatPrice(i.price * i.qty)}</p>
          </li>
        ))}
      </ul>
      <div className="summary__row"><span>{t('sum.delivery')}</span><span>{t('sum.confirmed')}</span></div>
      <div className="summary__row summary__row--total"><span>{t('sum.total')}</span><span>{formatPrice(total)}</span></div>
    </section>
  );
}
