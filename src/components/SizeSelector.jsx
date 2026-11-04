import { useI18n } from '../context/I18nContext.jsx';

export default function SizeSelector({ sizes, value, onChange, error }) {
  const { t } = useI18n();
  return (
    <fieldset className="sizes">
      <legend className="sizes__legend">{t('pdp.sizeLegend')}</legend>
      <div className="sizes__list">
        {sizes.map((s) => (
          <button key={s} type="button" className={`size${value === s ? ' is-selected' : ''}`}
            aria-pressed={value === s} onClick={() => onChange(s)}>{s}</button>
        ))}
      </div>
      {error && <p className="field__error" role="alert">{error}</p>}
    </fieldset>
  );
}
