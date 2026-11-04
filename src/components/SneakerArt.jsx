import { useI18n } from '../context/I18nContext.jsx';

// Neutral monochrome fallback shown only when a product photo is missing.
export default function SneakerArt() {
  const { t } = useI18n();
  return (
    <svg className="sneaker-art" viewBox="0 0 400 260" role="img" aria-label={t('art.alt')}>
      <path d="M30 190c0-14 8-22 22-24l66-12c18-3 30-14 40-30l12-20c4-6 12-8 18-4l38 26c10 7 22 11 34 12l64 6c24 2 40 18 40 40v14H30z" fill="#111" />
      <path d="M30 196h340v16c0 6-4 10-10 10H40c-6 0-10-4-10-10z" fill="#fff" stroke="#d9d9d9" />
      <path d="M170 124l30 20m10-34l30 20m-70 8l20 10" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".8" />
    </svg>
  );
}
