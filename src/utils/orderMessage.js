import { displayName, formatPrice } from '../data/products.js';

export const orderSubject = (order, t) => t('msg.subject', { ref: order.ref });

// Builds the order email text in the language currently selected in the app.
export function buildOrderMessage(order, t) {
  const c = order.customer;
  const lines = order.items.map((i) => `${i.qty}x ${displayName(i)} - EU ${i.size} - ${formatPrice(i.price * i.qty)}`);
  return [
    t('msg.hello'),
    '',
    t('msg.ref', { ref: order.ref }),
    ...lines,
    t('msg.total', { total: formatPrice(order.total) }),
    '',
    t('msg.name', { v: c.fullName }),
    t('msg.phone', { v: c.phone }),
    t('msg.city', { v: c.city }),
    t('msg.address', { v: c.address }),
    ...(c.notes ? [t('msg.notes', { v: c.notes })] : []),
    '',
    t('msg.bye'),
  ].join('\n');
}

const enc = encodeURIComponent;

// Opens the customer's own mail app with everything filled in.
export const mailtoLink = (email, subject, body) => `mailto:${email}?subject=${enc(subject)}&body=${enc(body)}`;

// Opens a Gmail compose window in the browser (for computers with no mail app set up).
export const gmailLink = (email, subject, body) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(email)}&su=${enc(subject)}&body=${enc(body)}`;
