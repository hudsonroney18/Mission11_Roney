import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { CartItem } from '../types/cartItem.ts';
import { useState } from 'react';
import '/Users/hudsonroney/RiderProjects/Mission11_Roney/frontend/src/components/BookList.css'; // Import the CSS file to apply styles

function AddtoCartPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  console.log('Params received:', title, bookID, price);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      price: Number(price),
      title: title || 'No Book Found',
      quantity,
    };
    addToCart(newItem);
    navigate('/CartPage');
  };

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">Add {title} to Cart</h1>

      <div className="card">
        <h3 className="card-title">{title}</h3>
        <div className="card-body">
          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(x) =>
              setQuantity(x.target.value ? Number(x.target.value) : 0)
            }
            className="form-control" // Adding a Bootstrap-like input style (you can style it more in CSS)
          />
          <div className="mt-3">
            <button onClick={handleAddToCart} className="sort-button">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <button onClick={() => navigate('/')} className="pagination-button">
          Go Back to Books
        </button>
      </div>
    </div>
  );
}

export default AddtoCartPage;
