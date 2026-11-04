import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useI18n } from '../context/I18nContext.jsx';
import { validateCheckout } from '../utils/validation.js';
import { createOrderRef, submitOrder } from '../services/orders.js';

const EMPTY = { fullName: '', phone: '', city: '', address: '', notes: '', ack: false };

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!lines.length) {
    return (
      <section className="section page-top"><div className="container empty">
        <h1 className="section__title">{t('co.emptyTitle')}</h1>
        <p className="section__sub">{t('co.emptySub')}</p>
        <Link to="/shop" className="btn btn--primary">{t('cartPage.browse')}</Link>
      </div></section>
    );
  }

  const errors = validateCheckout(values, t);
  const show = (name) => (touched[name] ? errors[name] : undefined);
  const bind = (name) => ({
    name, value: values[name], error: show(name),
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ fullName: true, phone: true, city: true, address: true, notes: true, ack: true });
    if (Object.keys(errors).length) {
      const first = Object.keys(errors)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const order = {
        ref: createOrderRef(),
        createdAt: new Date().toISOString(),
        customer: { fullName: values.fullName.trim(), phone: values.phone.trim(), city: values.city.trim(), address: values.address.trim(), notes: values.notes.trim() },
        items: lines.map((l) => ({ key: l.key, id: l.product.id, name: l.product.name, brand: l.product.brand, size: l.size, qty: l.qty, price: l.product.price, image: l.product.images[0] })),
        total: subtotal,
      };
      await submitOrder(order);
      clear();
      navigate('/order-confirmation');
    } catch {
      setSubmitError(t('co.submitError'));
      setSubmitting(false);
    }
  };

  const summaryItems = lines.map((l) => ({ key: l.key, id: l.product.id, name: l.product.name, brand: l.product.brand, size: l.size, qty: l.qty, price: l.product.price, image: l.product.images[0] }));

  return (
    <section className="section page-top">
      <div className="container">
        <h1 className="section__title">{t('co.title')}</h1>
        <div className="notice notice--info">
          <strong>{t('co.noticeStrong')}</strong>{t('co.notice')}
        </div>
        <div className="cart-layout">
          <form className="form" onSubmit={handleSubmit} noValidate>
            <FormField label={t('co.fullName')} autoComplete="name" {...bind('fullName')} />
            <FormField label={t('co.phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="+389 70 123 456" hint={t('co.phoneHint')} {...bind('phone')} />
            <FormField label={t('co.city')} autoComplete="address-level2" {...bind('city')} />
            <FormField label={t('co.address')} autoComplete="street-address" {...bind('address')} />
            <FormField label={t('co.notes')} multiline required={false} {...bind('notes')} />
            <div className={`check${show('ack') ? ' has-error' : ''}`}>
              <label>
                <input type="checkbox" checked={values.ack}
                  onChange={(e) => setValues((v) => ({ ...v, ack: e.target.checked }))}
                  onBlur={() => setTouched((t) => ({ ...t, ack: true }))} aria-invalid={Boolean(show('ack'))} />
                <span>{t('co.ack')}</span>
              </label>
              {show('ack') && <p className="field__error" role="alert">{errors.ack}</p>}
            </div>
            {submitError && <p className="notice notice--error" role="alert">{submitError}</p>}
            <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
              {submitting ? t('co.sending') : t('co.submit')}
            </button>
          </form>
          <aside><OrderSummary items={summaryItems} total={subtotal} /></aside>
        </div>
      </div>
    </section>
  );
}
