import { useState } from 'react';
import BookList from '../components/BookList';
// import CategoryFilter from '../components/CategoryFilter';
// import ProjectList from '../components/ProjectList';
// import WelcomeBand from '../components/WelcomeBand';
// import CartSummary from '../components/CartSummary';

function BookPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    return (
        <>
        <div>
            <p>Category filter</p>
        </div>
        <div>
            <BookList selectedCategories={selectedCategories} />
        </div>
        </>
    );
}
export default BookPage

// function BookListPage() {
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

//   return (
//     <div className="container mt-4">
//       <CartSummary />
//       <WelcomeBand />

//       <div className="row">
//         <div className="col-md-3">
//           <CategoryFilter
//             selectedCategories={selectedCategories}
//             setSelectedCategories={setSelectedCategories}
//           />
//         </div>
//         <div className="col-md-9">
//           <ProjectList selectedCategories={selectedCategories} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectsPage;
