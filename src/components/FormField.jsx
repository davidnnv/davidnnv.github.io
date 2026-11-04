import { useI18n } from '../context/I18nContext.jsx';

export default function FormField({ label, name, value, onChange, onBlur, error, type = 'text', multiline = false,
  required = true, autoComplete, inputMode, hint, placeholder }) {
  const { t } = useI18n();
  const id = `f-${name}`;
  const Tag = multiline ? 'textarea' : 'input';
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}{required ? '' : t('co.optional')}</label>
      <Tag id={id} name={name} value={value} onChange={onChange} onBlur={onBlur} autoComplete={autoComplete}
        inputMode={inputMode} placeholder={placeholder} type={multiline ? undefined : type} rows={multiline ? 4 : undefined}
        aria-invalid={Boolean(error)} aria-describedby={describedBy} />
      {hint && !error && <p id={`${id}-hint`} className="field__hint">{hint}</p>}
      {error && <p id={`${id}-err`} className="field__error" role="alert">{error}</p>}
    </div>
  );
}
