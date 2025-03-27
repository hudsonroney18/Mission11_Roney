import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/cartItem';
import { Toast } from 'react-bootstrap';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);
      const updatedCart = prevCart.map((c) =>
        c.bookID === item.bookID
          ? { ...c, quantity: c.quantity + item.quantity }
          : c
      );

      // Show toast when item is added
      setShowToast(true);

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  // Remove item from cart
  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((c) => c.bookID !== bookID);

      // Show toast when item is removed
      setShowToast(true);

      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        showToast,
        setShowToast,
      }}
    >
      {children}

      {/* Toast notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000} // Auto-hide after 3 seconds
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body>Item added/removed from cart!</Toast.Body>
      </Toast>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
