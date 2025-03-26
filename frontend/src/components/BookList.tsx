import { useEffect, useState } from 'react';
import { Book } from '../types/book';
import './BookList.css';
import { useNavigate } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
      .map((cat) => `category=${encodeURIComponent(cat)}`)
      .join('&');
      const response = await fetch(
        `https://localhost:5000/api/Book/book?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
    };

    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  // Sort books based on the title and the current sortOrder
  const sortedBooks = books.sort((a, b) => {
    if (a.title < b.title) return sortOrder === 'asc' ? -1 : 1;
    if (a.title > b.title) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Calculate total pages AFTER totalItems updates
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">Books</h1>
      <div className="sort-container">
        {/* Sort by title button */}
        <button
          className="sort-button"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      {/* Book Cards Grid */}
      <div className="row">
        {sortedBooks.map((b) => (
          <div key={b.bookID} className="col-md-4 mb-4">
            <div className="card">
              <h3 className="card-title">{b.title}</h3>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>
                    <strong>Author:</strong> {b.author}
                  </li>
                  <li>
                    <strong>Publisher:</strong> {b.publisher}
                  </li>
                  <li>
                    <strong>ISBN:</strong> {b.isbn}
                  </li>
                  <li>
                    <strong>Classification:</strong> {b.classification}
                  </li>
                  <li>
                    <strong>Number Of Pages:</strong> {b.pageCount}
                  </li>
                  <li>
                    <strong>Category:</strong> {b.category}
                  </li>
                  <li>
                    <strong>Price:</strong> ${b.price}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="pagination">
        <button
          className="pagination-button"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {/* Page Number Buttons */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className="pagination-button"
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="pagination-button"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      <br />
      <div className="results-per-page">
        <label>
          Results per page:
          <select
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default BookList;
