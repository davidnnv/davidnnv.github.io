import { useMemo, useState } from 'react';
import ProductGrid from '../components/ProductGrid.jsx';
import { products } from '../data/products.js';
import { useI18n } from '../context/I18nContext.jsx';
import { PRICE_RANGES, SORT_OPTIONS, filterProducts, sortProducts } from '../utils/catalog.js';

const brands = [...new Set(products.map((p) => p.brand))].sort();
const allSizes = [...new Set(products.flatMap((p) => p.sizes))].sort((a, b) => a - b);
const DEFAULTS = { query: '', brand: 'all', size: 'all', price: 'all', sort: 'featured' };

export default function ShopPage() {
  const { t } = useI18n();
  const [f, setF] = useState(DEFAULTS);
  const set = (key) => (e) => setF((prev) => ({ ...prev, [key]: e.target.value }));
  const results = useMemo(() => sortProducts(filterProducts(products, f), f.sort), [f]);
  const active = f.query || f.brand !== 'all' || f.size !== 'all' || f.price !== 'all';

  return (
    <section className="section page-top">
      <div className="container">
        <h1 className="section__title">{t('shop.title')}</h1>
        <p className="section__sub">{t('shop.sub')}</p>

        <div className="toolbar">
          <div className="field toolbar__search">
            <label htmlFor="search" className="sr-only">{t('shop.search')}</label>
            <input id="search" type="search" placeholder={t('shop.search')} value={f.query} onChange={set('query')} />
          </div>
          <div className="field toolbar__sort">
            <label htmlFor="sort" className="sr-only">{t('shop.sortBy')}</label>
            <select id="sort" value={f.sort} onChange={set('sort')}>
              {SORT_OPTIONS.map((id) => <option key={id} value={id}>{t(`sort.${id}`)}</option>)}
            </select>
          </div>
        </div>

        <details className="filters" open>
          <summary>{t('shop.filters')}</summary>
          <div className="filters__grid">
            <div className="field">
              <label htmlFor="brand">{t('shop.brand')}</label>
              <select id="brand" value={f.brand} onChange={set('brand')}>
                <option value="all">{t('shop.allBrands')}</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="size">{t('shop.size')}</label>
              <select id="size" value={f.size} onChange={set('size')}>
                <option value="all">{t('shop.allSizes')}</option>
                {allSizes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="price">{t('shop.price')}</label>
              <select id="price" value={f.price} onChange={set('price')}>
                {PRICE_RANGES.map((r) => <option key={r.id} value={r.id}>{t(`price.${r.id}`)}</option>)}
              </select>
            </div>
          </div>
        </details>

        <p className="results" aria-live="polite">
          {t('shop.results', { n: results.length })}
          {active && <button type="button" className="text-link" onClick={() => setF(DEFAULTS)}>{t('shop.clear')}</button>}
        </p>

        {results.length ? <ProductGrid products={results} /> : (
          <div className="empty"><h2 className="section__title">{t('shop.noMatch')}</h2>
            <p className="section__sub">{t('shop.noMatchSub')}</p>
            <button type="button" className="btn btn--ghost" onClick={() => setF(DEFAULTS)}>{t('shop.clear')}</button>
          </div>
        )}
      </div>
    </section>
  );
}
