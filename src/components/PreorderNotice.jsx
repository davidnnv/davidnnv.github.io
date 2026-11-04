import { useI18n } from '../context/I18nContext.jsx';

const steps = ['1', '2', '3'];

export default function PreorderNotice() {
  const { t } = useI18n();
  return (
    <section className="section" aria-labelledby="how-title">
      <div className="container">
        <h2 id="how-title" className="section__title">{t('how.title')}</h2>
        <ol className="steps">
          {steps.map((n) => (
            <li key={n} className="steps__item">
              <span className="steps__num">0{n}</span>
              <h3>{t(`how.${n}.t`)}</h3>
              <p>{t(`how.${n}.d`)}</p>
            </li>
          ))}
        </ol>
        <p className="fineprint">{t('how.fine')}</p>
      </div>
    </section>
  );
}
