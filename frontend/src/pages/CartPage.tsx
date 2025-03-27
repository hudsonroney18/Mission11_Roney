import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/cartItem';
import '../components/BookList.css'; // Import the CSS file

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Format price to two decimal places
  const formatPrice = (price: number) => price.toFixed(2);

  return (
    <>
      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
          ) : (
            <ul className="cart-list">
              {cart.map((item: CartItem) => (
                <li key={item.bookID} className="cart-item">
                  <span className="cart-item-title">{item.title}</span>: $
                  {formatPrice(item.price)} x {item.quantity} = $
                  {formatPrice(item.price * item.quantity)}
                  <button
                    className="btn btn-remove"
                    onClick={() => removeFromCart(item.bookID)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Calculate and display total */}
        <h3 className="cart-total">Total: ${formatPrice(calculateTotal())}</h3>

        {/* Continue shopping button */}
        <button className="btn btn-continue" onClick={() => navigate('/')}>
          Continue Buying Books
        </button>
      </div>
    </>
  );
}

export default CartPage;
