import { useI18n } from '../context/I18nContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

// Language + dark mode toggles, shown in the header.
export default function Preferences() {
  const { lang, t, toggleLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  return (
    <div className="prefs">
      <button type="button" className="prefs__btn prefs__lang" onClick={toggleLang}
        aria-label={lang === 'en' ? t('pref.langToMk') : t('pref.langToEn')} lang={lang === 'en' ? 'mk' : 'en'}>
        {t('pref.langShort')}
      </button>
      <button type="button" className="prefs__btn" onClick={toggleTheme} aria-pressed={dark}
        aria-label={dark ? t('pref.toLight') : t('pref.toDark')}>
        {dark ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
