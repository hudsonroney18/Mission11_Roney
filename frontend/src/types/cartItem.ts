export interface CartItem {
  // Each individual book in the cart
  bookID: number;
  title: string;
  price: number; // Total price for the price of one book
  quantity: number; // Total number of books
}
