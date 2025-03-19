import { useEffect, useState } from 'react';
import { Book } from '../types/book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book/book?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems]);

  // Sort books based on the title and the current sortOrder
  const sortedBooks = books.sort((a, b) => {
    if (a.title < b.title) return sortOrder === 'asc' ? -1 : 1;
    if (a.title > b.title) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Calculate total pages AFTER totalItems updates
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <>
      <h1>Book Projects</h1>
      <br />

      {/* Sort by title button */}
      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      {sortedBooks.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                {' '}
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                {' '}
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                {' '}
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                {' '}
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                {' '}
                <strong>Number Of Pages:</strong> {b.pageCount}
              </li>
              <li>
                {' '}
                <strong>Price:</strong> ${b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      {/* Pagination Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <button
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {/* Page Number Buttons */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
            style={{
              backgroundColor: pageNum === index + 1 ? '#007bff' : 'white',
              color: pageNum === index + 1 ? 'white' : 'black',
              border: '1px solid #ccc',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      <br />
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
    </>
  );
}

export default BookList;
