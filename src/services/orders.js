// Order submission. PHASE 3 STUB: saves the order in this browser only.
// Nothing is sent to the store yet. Replace the body of submitOrder() with a real
// backend call (an email/form service such as Formspree or EmailJS, or a database) so orders arrive automatically.
const LAST_ORDER_KEY = 'rebellion-mk-last-order';

export function createOrderRef() {
  const d = new Date();
  const date = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RMK-${date}-${rand}`;
}

export async function submitOrder(order) {
  try { localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order)); } catch { /* storage unavailable */ }
  return order;
}

export function getLastOrder() {
  try { return JSON.parse(localStorage.getItem(LAST_ORDER_KEY)); } catch { return null; }
}
