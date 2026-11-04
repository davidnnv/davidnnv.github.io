// Helpers for translating catalog data. Product names and brands stay as-is (they are trademarks).

export function localizeColorway(t, colorway) {
  if (!colorway) return '';
  return colorway.split(' / ').map((c) => {
    const key = `color.${c}`;
    const out = t(key);
    return out === key ? c : out;
  }).join(' / ');
}

export function localizeDescription(t, product) {
  const key = `p.${product.id}`;
  const out = t(key);
  return out === key ? product.description : out;
}
