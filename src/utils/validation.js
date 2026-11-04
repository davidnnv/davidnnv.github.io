// Returns { field: message } using the translate function t() so errors follow the selected language.
export function validateCheckout(v, t) {
  const e = {};
  const name = v.fullName.trim();
  if (!name) e.fullName = t('val.nameEmpty');
  else if (name.length < 5 || name.split(/\s+/).length < 2) e.fullName = t('val.nameShort');

  const digits = v.phone.replace(/\D/g, '');
  if (!v.phone.trim()) e.phone = t('val.phoneEmpty');
  else if (!/^[+\d\s()-]+$/.test(v.phone) || digits.length < 8 || digits.length > 15) e.phone = t('val.phoneBad');

  if (v.city.trim().length < 2) e.city = t('val.city');
  if (v.address.trim().length < 6) e.address = t('val.address');
  if (v.notes.length > 500) e.notes = t('val.notes');
  if (!v.ack) e.ack = t('val.ack');
  return e;
}
