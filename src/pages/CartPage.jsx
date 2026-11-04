import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import QuantityControl from '../components/QuantityControl.jsx';
import { formatPrice } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useI18n } from '../context/I18nContext.jsx';

export default function CartPage() {
  const { lines, subtotal, count, maxQty, setQty, removeItem } = useCart();
  const { t } = useI18n();

  if (!lines.length) {
    return (
      <section className="section page-top"><div className="container empty">
        <h1 className="section__title">{t('cartPage.emptyTitle')}</h1>
        <p className="section__sub">{t('cartPage.emptySub')}</p>
        <Link to="/shop" className="btn btn--primary">{t('cartPage.browse')}</Link>
      </div></section>
    );
  }

  return (
    <section className="section page-top">
      <div className="container">
        <h1 className="section__title">{t('cartPage.title')} <span className="muted">({count})</span></h1>
        <div className="cart-layout">
          <ul className="cart-list">
            {lines.map((l) => (
              <li key={l.key} className="cart-item">
                <Link to={`/product/${l.product.id}`} className="cart-item__thumb"><ProductImage src={l.product.images[0]} alt="" /></Link>
                <div className="cart-item__info">
                  <p className="card__brand">{l.product.brand}</p>
                  <Link to={`/product/${l.product.id}`} className="card__name">{l.product.name}</Link>
                  <p className="card__sizes">{t('cartPage.size', { size: l.size })}</p>
                  <div className="cart-item__controls">
                    <QuantityControl value={l.qty} max={maxQty} label={t('cartPage.sizeLabel', { name: l.product.name, size: l.size })} onChange={(q) => setQty(l.key, q)} />
                    <button type="button" className="text-link" onClick={() => removeItem(l.key)}>{t('cartPage.remove')}</button>
                  </div>
                </div>
                <p className="cart-item__price">{formatPrice(l.product.price * l.qty)}</p>
              </li>
            ))}
          </ul>
          <aside className="cart-total">
            <h2 className="summary__title">{t('cartPage.summary')}</h2>
            <div className="summary__row"><span>{t('cartPage.subtotal')}</span><span>{formatPrice(subtotal)}</span></div>
            <div className="summary__row"><span>{t('sum.delivery')}</span><span>{t('sum.confirmed')}</span></div>
            <div className="summary__row summary__row--total"><span>{t('sum.total')}</span><span>{formatPrice(subtotal)}</span></div>
            <p className="fineprint">{t('cartPage.note')}</p>
            <Link to="/checkout" className="btn btn--primary btn--block">{t('cartPage.checkout')}</Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
