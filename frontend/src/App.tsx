import './App.css';
import BookList from './components/BookList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookPage from './pages/BookPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BookPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
