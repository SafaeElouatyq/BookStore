import { ShoppingCart } from "lucide-react";

const BookCard = ({ book, addToCart }) => {
  return (
    <div className="book-card">
      <img
        src={book.image || "https://via.placeholder.com/200"}
        alt={book.title}
        className="book-image"
      />

      <div className="book-info">
        <h3>{book.title}</h3>

        <p className="book-author">
          {book.author?.nom} {book.author?.prenom}
        </p>

        <p className="book-price">{book.price} DH</p>

        <button className="add-cart-btn" onClick={() => addToCart(book)}>
          <ShoppingCart size={18} />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default BookCard;