import { Link } from 'react-router-dom';
import OrderActions from '../components/OrderActions.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import { useI18n } from '../context/I18nContext.jsx';
import { getLastOrder } from '../services/orders.js';

export default function ConfirmationPage() {
  const { t } = useI18n();
  const order = getLastOrder();

  if (!order) {
    return (
      <section className="section page-top"><div className="container empty">
        <h1 className="section__title">{t('conf.none')}</h1>
        <Link to="/shop" className="btn btn--primary">{t('cartPage.browse')}</Link>
      </div></section>
    );
  }

  const { customer } = order;
  return (
    <section className="section page-top">
      <div className="container confirm">
        <p className="eyebrow">{t('conf.eyebrow')}</p>
        <h1 className="section__title">{t('conf.thanks', { name: customer.fullName.split(' ')[0] })}</h1>
        <p className="section__sub">{t('conf.refA')}<strong className="ref">{order.ref}</strong>{t('conf.refB')}</p>

        <div className="cart-layout">
          <div>
            <section className="send-card" aria-labelledby="send-title">
              <h2 id="send-title" className="summary__title">{t('conf.sendTitle')}</h2>
              <p>{t('conf.sendText')}</p>
              <OrderActions order={order} />
            </section>

            <h2 className="summary__title">{t('conf.nextTitle')}</h2>
            <ol className="next-steps">
              <li>{t('conf.next1')}</li>
              <li>{t('conf.next2')}</li>
              <li>{t('conf.next3A')}<strong>{customer.phone}</strong>{t('conf.next3B')}</li>
              <li>{t('conf.next4')}</li>
            </ol>

            <h2 className="summary__title">{t('conf.details')}</h2>
            <dl className="details">
              <dt>{t('conf.name')}</dt><dd>{customer.fullName}</dd>
              <dt>{t('conf.phone')}</dt><dd>{customer.phone}</dd>
              <dt>{t('conf.city')}</dt><dd>{customer.city}</dd>
              <dt>{t('conf.address')}</dt><dd>{customer.address}</dd>
              {customer.notes && <><dt>{t('conf.notes')}</dt><dd>{customer.notes}</dd></>}
            </dl>
            <Link to="/shop" className="btn btn--ghost">{t('conf.continue')}</Link>
          </div>
          <aside><OrderSummary items={order.items} total={order.total} title={t('conf.summary')} /></aside>
        </div>
      </div>
    </section>
  );
}
