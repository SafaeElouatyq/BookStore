import { useEffect, useState } from "react";
import axios from "axios";
import ClientLayout from "../../components/client/clientLayout";
import BookCard from "../../components/client/BookCard";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item._id === book._id);

    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Livre ajouté au panier");
  };

  return (
    <ClientLayout>
      <div className="client-page-header">
        <h1>Nos Livres</h1>
        <p>Découvrez tous les livres disponibles.</p>
      </div>

      <div className="books-grid">
        {books.length === 0 ? (
          <p>Aucun livre disponible.</p>
        ) : (
          books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              addToCart={addToCart}
            />
          ))
        )}
      </div>
    </ClientLayout>
  );
};

export default Books;