import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useI18n } from '../context/I18nContext.jsx';

export default function CartButton() {
  const { count } = useCart();
  const { t } = useI18n();
  return (
    <Link to="/cart" className="cart-btn" aria-label={t('cart.aria', { n: count })}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M6 7h12l-1 13H7L6 7z" strokeLinejoin="round" />
        <path d="M9 7a3 3 0 016 0" />
      </svg>
      <span className="cart-btn__count">{count}</span>
    </Link>
  );
}
