import { useI18n } from '../context/I18nContext.jsx';

export default function QuantityControl({ value, max, onChange, label }) {
  const { t } = useI18n();
  return (
    <div className="qty" role="group" aria-label={t('cartPage.qtyFor', { label })}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label={t('cartPage.dec')}>−</button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={t('cartPage.inc')}>+</button>
    </div>
  );
}
