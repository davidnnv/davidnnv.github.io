import { Component } from 'react';
import { dictionaries } from '../i18n/translations.js';

// Shows a readable message instead of a blank page if a component crashes.
// Sits outside the providers, so it reads the saved language directly.
function savedLang() {
  try { return localStorage.getItem('rebellion-mk-lang') === 'mk' ? 'mk' : 'en'; } catch { return 'en'; }
}

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('REBELLION MK crashed:', error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    const d = dictionaries[savedLang()];
    return (
      <div style={{ maxWidth: 560, margin: '20vh auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: 12 }}>{d['err.title']}</h1>
        <p style={{ color: '#888', marginBottom: 16 }}>{d['err.text']}</p>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '.8rem', background: 'rgba(128,128,128,.15)', padding: 12 }}>
          {String(this.state.error?.message || this.state.error)}
        </pre>
      </div>
    );
  }
}
