import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { dictionaries } from '../i18n/translations.js';

const LANG_KEY = 'rebellion-mk-lang';
const LANGS = ['en', 'mk'];

function initialLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch { /* storage unavailable */ }
  const nav = typeof navigator !== 'undefined' ? (navigator.language || '').toLowerCase() : '';
  return nav.startsWith('mk') ? 'mk' : 'en';
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang]['meta.title'];
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* storage unavailable */ }
  }, [lang]);

  const t = useCallback((key, vars) => {
    const dict = dictionaries[lang];
    let k = key;
    if (vars && typeof vars.n === 'number') {
      const plural = `${key}.${vars.n === 1 ? 'one' : 'other'}`;
      if (plural in dict) k = plural;
    }
    let text = dict[k] ?? dictionaries.en[k] ?? key;
    if (vars) text = text.replace(/\{(\w+)\}/g, (m, name) => (name in vars ? String(vars[name]) : m));
    return text;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    t,
    setLang: (l) => LANGS.includes(l) && setLangState(l),
    toggleLang: () => setLangState((l) => (l === 'en' ? 'mk' : 'en')),
  }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
