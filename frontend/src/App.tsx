import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookPage from './pages/BookPage';
import AddtoCartPage from './pages/AddtoCartPage';
import CartPage from './pages/CartPage';
import AdminBooksPage from './pages/adminBooks'; // Add the import for AdminBooksPage
import { CartProvider } from './context/CartContext';
import CookieConsent from 'react-cookie-consent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookPage />} />
            <Route
              path="/AddtoCartPage/:title/:bookID/:price"
              element={<AddtoCartPage />}
            />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />{' '}
            {/* Add the route for AdminBooksPage */}
          </Routes>
        </Router>
      </CartProvider>
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
}

export default App;
