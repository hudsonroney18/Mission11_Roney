import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/cartItem';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Calculate the total quantity of items in the cart
  const totalQuantity = cart.reduce(
    (sum, item: CartItem) => sum + item.quantity,
    0
  );

  // Calculate the total price of the cart
  const totalPrice = cart.reduce(
    (sum, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  // Format price to two decimal places
  const formatPrice = (price: number) => price.toFixed(2);

  return (
    <div
      style={{
        position: 'fixed',
        top: '15px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column', // Make it a column layout for better readability
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
        minWidth: '120px', // Make it large enough to fit all content
      }}
      onClick={() => navigate('/cart')}
    >
      <strong>Total Items: {totalQuantity}</strong>
      <div>Total: ${formatPrice(totalPrice)}</div>
    </div>
  );
};

export default CartSummary;
