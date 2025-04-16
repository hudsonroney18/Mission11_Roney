import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import CartSummary from '../components/CartSummary';
import { useNavigate } from 'react-router-dom';

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  return (
    <>
      <CartSummary />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <br></br>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/adminbooks`)
              }
            >
              Admin Books
            </button>
          </div>
          <div className="col-md-9">
            <h1 className="text-center text-primary">Book List</h1>
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BookPage;
