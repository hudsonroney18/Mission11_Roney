import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://mission13-backend-hvbwgmb4ehh8akc7.westus3-01.azurewebsites.net/api/Book/GetBookCategories'
        );
        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="card shadow-sm p-3 mb-4 bg-white rounded border-0">
      <div className="card-body">
        <h5 className="card-title text-center text-primary">Book Categories</h5>
        <div className="category-list d-flex flex-wrap gap-2">
          {categories.map((c) => (
            <div key={c} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={c}
                value={c}
                checked={selectedCategories.includes(c)}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={c}>
                {c}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
