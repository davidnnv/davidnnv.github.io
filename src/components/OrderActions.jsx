import { useState } from 'react';
import { useI18n } from '../context/I18nContext.jsx';
import { STORE } from '../config/store.js';
import { buildOrderMessage, gmailLink, mailtoLink, orderSubject } from '../utils/orderMessage.js';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function OrderActions({ order }) {
  const { t } = useI18n();
  const [status, setStatus] = useState('');
  const message = buildOrderMessage(order, t);
  const subject = orderSubject(order, t);

  const handleCopy = async () => setStatus((await copyText(message)) ? 'copied' : 'failed');

  return (
    <div className="order-actions">
      <div className="action-row">
        <a className="btn btn--primary" href={mailtoLink(STORE.email, subject, message)}>{t('act.email')}</a>
        <a className="btn btn--ghost" href={gmailLink(STORE.email, subject, message)} target="_blank" rel="noopener noreferrer">{t('act.gmail')}</a>
      </div>
      <p className="fineprint" role="status" aria-live="polite">
        {status === 'copied' && t('act.copied')}
        {status === 'failed' && t('act.failed')}
        {!status && t('act.hint')}
        <strong>{STORE.email}</strong>.
      </p>
      <details className="msg-preview">
        <summary>{t('act.show')}</summary>
        <pre>{message}</pre>
        <button type="button" className="text-link" onClick={handleCopy}>{t('act.copy')}</button>
      </details>
    </div>
  );
}
