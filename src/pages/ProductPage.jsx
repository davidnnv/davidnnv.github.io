import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductImage from '../components/ProductImage.jsx';
import SizeSelector from '../components/SizeSelector.jsx';
import { displayName, formatPrice, getProductById } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useI18n } from '../context/I18nContext.jsx';
import { localizeColorway, localizeDescription } from '../utils/localize.js';

export default function ProductPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addItem } = useCart();
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState(null);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="section"><div className="container empty">
        <h1 className="section__title">{t('pdp.notFound')}</h1>
        <Link to="/shop" className="btn btn--primary">{t('pdp.back')}</Link>
      </div></section>
    );
  }

  const label = displayName(product);

  const handleAdd = () => {
    if (!size) { setError(t('pdp.sizeError')); setAdded(false); return; }
    addItem(product.id, size);
    setError('');
    setAdded(true);
  };

  return (
    <section className="section page-top">
      <div className="container pdp">
        <div className="pdp__gallery">
          <div className="pdp__main">
            <ProductImage key={product.images[index]} src={product.images[index]} alt={label} eager />
          </div>
          {product.images.length > 1 && (
            <div className="pdp__thumbs">
              {product.images.map((src, i) => (
                <button key={src} type="button" className={`pdp__thumb${i === index ? ' is-active' : ''}`}
                  onClick={() => setIndex(i)} aria-label={t('pdp.showImage', { n: i + 1 })} aria-current={i === index}>
                  <ProductImage src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pdp__info">
          <p className="breadcrumb"><Link to="/shop">{t('nav.shop')}</Link> / {product.brand}</p>
          <p className="card__brand">{product.brand}</p>
          <h1 className="pdp__title">{product.name}</h1>
          <p className="pdp__price">{formatPrice(product.price)}</p>
          {product.colorway && <p className="card__sizes">{t('pdp.colour', { c: localizeColorway(t, product.colorway) })}</p>}
          <p className="pdp__desc">{localizeDescription(t, product)}</p>

          <SizeSelector sizes={product.sizes} value={size} error={error} onChange={(s) => { setSize(s); setError(''); setAdded(false); }} />

          <button type="button" className="btn btn--primary btn--block" onClick={handleAdd}>{t('pdp.add')}</button>
          {added && (
            <p className="notice notice--ok" role="status">
              {t('pdp.added', { size })} <Link to="/cart" className="text-link">{t('pdp.viewCart')}</Link>
            </p>
          )}

          <div className="preorder-box">
            <h2>{t('pdp.preTitle')}</h2>
            <p>{t('pdp.preText')}</p>
            <p><strong>{t('pdp.etaLabel')}</strong> {t('pdp.eta')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
