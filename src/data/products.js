// SAMPLE DATA — placeholder catalog until real inventory and sourcing are confirmed.
// Photos: /public/images/products/<id>-1.jpg (add -2, -3 ... and list them in `images` for the gallery).
// If a file is missing, the UI falls back to a neutral sneaker illustration.

const img = (id, count = 1) => Array.from({ length: count }, (_, i) => `/images/products/${id}-${i + 1}.jpg`);

export const products = [
  { id: 'nike-air-force-1-low-white', name: 'Air Force 1 \u201907', brand: 'Nike', price: 129, colorway: 'White', category: 'Lifestyle', addedAt: '2026-09-02',
    description: 'The icon. Clean leather upper and Air cushioning in all-white.',
    images: img('nike-air-force-1-low-white'), sizes: [38, 39, 40, 41, 42, 43, 44, 45], isNew: false, isFeatured: true, bestSeller: true },
  { id: 'nike-dunk-low-red', name: 'Dunk Low Retro', brand: 'Nike', price: 139, colorway: 'Red / White', category: 'Lifestyle', addedAt: '2026-10-20',
    description: 'Court-born silhouette in a bold red and white colorway.',
    images: img('nike-dunk-low-red'), sizes: [38, 39, 40, 41, 42, 43, 44], isNew: true, isFeatured: true, bestSeller: true },
  { id: 'air-jordan-1-retro-high-og', name: 'Air Jordan 1 Retro High OG', brand: 'Jordan', price: 189, colorway: 'Red / White / Black', category: 'Basketball', addedAt: '2026-10-25',
    description: 'The 1985 original, rebuilt with premium leather and high-top support.',
    images: img('air-jordan-1-retro-high-og'), sizes: [40, 41, 42, 43, 44, 45, 46], isNew: true, isFeatured: true, bestSeller: false },
  { id: 'air-jordan-4-retro', name: 'Air Jordan 4 Retro', brand: 'Jordan', price: 229, colorway: 'White / Green', category: 'Basketball', addedAt: '2026-10-28',
    description: 'Mesh panels, molded eyelets and visible Air. A 1989 classic.',
    images: img('air-jordan-4-retro'), sizes: [40, 41, 42, 43, 44, 45], isNew: true, isFeatured: true, bestSeller: false },
  { id: 'nike-air-max-90', name: 'Air Max 90', brand: 'Nike', price: 149, colorway: 'White / Grey / Black', category: 'Running', addedAt: '2026-08-15',
    description: 'Waffle outsole, stitched overlays and a visible Max Air unit.',
    images: img('nike-air-max-90'), sizes: [38, 39, 40, 41, 42, 43, 44, 45], isNew: false, isFeatured: true, bestSeller: true },
  { id: 'new-balance-9060', name: '9060', brand: 'New Balance', price: 159, colorway: 'Teal / Cream', category: 'Lifestyle', addedAt: '2026-10-30',
    description: 'Futuristic, chunky and layered. Inspired by the 99X series.',
    images: img('new-balance-9060'), sizes: [39, 40, 41, 42, 43, 44, 45], isNew: true, isFeatured: false, bestSeller: false },
  { id: 'air-jordan-3-retro', name: 'Air Jordan 3 Retro', brand: 'Jordan', price: 209, colorway: 'White / Cement Grey / Black', category: 'Basketball', addedAt: '2026-09-18',
    description: 'Elephant-print overlays and a visible Air unit from 1988.',
    images: img('air-jordan-3-retro'), sizes: [40, 41, 42, 43, 44, 45], isNew: false, isFeatured: false, bestSeller: false },
  { id: 'new-balance-550', name: '550', brand: 'New Balance', price: 139, colorway: 'White / Green', category: 'Lifestyle', addedAt: '2026-09-25',
    description: 'Vintage basketball lines in a clean leather build.',
    images: img('new-balance-550'), sizes: [38, 39, 40, 41, 42, 43, 44], isNew: false, isFeatured: false, bestSeller: true },
  { id: 'nike-vomero-5', name: 'Zoom Vomero 5', brand: 'Nike', price: 169, colorway: 'Grey / Cream', category: 'Running', addedAt: '2026-10-12',
    description: 'Technical running look with layered mesh and Zoom Air cushioning.',
    images: img('nike-vomero-5'), sizes: [39, 40, 41, 42, 43, 44, 45], isNew: false, isFeatured: false, bestSeller: false },
  { id: 'adidas-samba-og', name: 'Samba OG', brand: 'Adidas', price: 119, colorway: 'Green / Cream', category: 'Lifestyle', addedAt: '2026-09-05',
    description: 'Terrace classic with suede overlays and a gum sole.',
    images: img('adidas-samba-og'), sizes: [38, 39, 40, 41, 42, 43, 44], isNew: false, isFeatured: false, bestSeller: false },
];

const byNewest = (a, b) => b.addedAt.localeCompare(a.addedAt);
export const featuredProducts = products.filter((p) => p.isFeatured);
export const newArrivals = products.filter((p) => p.isNew).sort(byNewest);
export const bestSellers = products.filter((p) => p.bestSeller);
export const getProductById = (id) => products.find((p) => p.id === id);
// "Jordan" + "Air Jordan 1" -> "Air Jordan 1" (no doubled brand); "Nike" + "Dunk Low" -> "Nike Dunk Low".
export const displayName = ({ brand, name }) => (name.toLowerCase().includes(brand.toLowerCase()) ? name : `${brand} ${name}`);
export const formatPrice = (value) => `\u20ac${value}`;
