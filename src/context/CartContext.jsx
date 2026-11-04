import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { getProductById } from '../data/products.js';

const KEY = 'rebellion-mk-cart-v1';
const MAX_QTY = 5;
const CartContext = createContext(null);

// Stored items are { key, id, size, qty }. Prices are always read from product data.
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(raw) ? raw.filter((i) => i && i.key && i.id && i.size && i.qty > 0) : [];
  } catch { return []; }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const key = `${action.id}__${action.size}`;
      const existing = state.find((i) => i.key === key);
      if (existing) return state.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + 1, MAX_QTY) } : i));
      return [...state, { key, id: action.id, size: action.size, qty: 1 }];
    }
    case 'setQty':
      return state
        .map((i) => (i.key === action.key ? { ...i, qty: Math.min(action.qty, MAX_QTY) } : i))
        .filter((i) => i.qty > 0);
    case 'remove': return state.filter((i) => i.key !== action.key);
    case 'clear': return [];
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items]);

  const value = useMemo(() => {
    const lines = items
      .map((i) => ({ ...i, product: getProductById(i.id) }))
      .filter((l) => l.product);
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.qty * l.product.price, 0),
      maxQty: MAX_QTY,
      addItem: (id, size) => dispatch({ type: 'add', id, size }),
      setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
      removeItem: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
