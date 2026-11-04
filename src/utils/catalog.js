// Labels live in i18n/translations.js under price.<id> and sort.<id>.
export const PRICE_RANGES = [
  { id: 'all', test: () => true },
  { id: 'u150', test: (p) => p < 150 },
  { id: '150-200', test: (p) => p >= 150 && p <= 200 },
  { id: 'o200', test: (p) => p > 200 },
];

export const SORT_OPTIONS = ['featured', 'newest', 'price-asc', 'price-desc'];

export function filterProducts(list, { query, brand, size, price }) {
  const q = query.trim().toLowerCase();
  const range = PRICE_RANGES.find((r) => r.id === price) || PRICE_RANGES[0];
  return list.filter((p) =>
    (!q || `${p.brand} ${p.name} ${p.category}`.toLowerCase().includes(q)) &&
    (brand === 'all' || p.brand === brand) &&
    (size === 'all' || p.sizes.includes(Number(size))) &&
    range.test(p.price)
  );
}

export function sortProducts(list, sort) {
  const copy = [...list];
  if (sort === 'newest') copy.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  if (sort === 'price-asc') copy.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') copy.sort((a, b) => b.price - a.price);
  return copy;
}
