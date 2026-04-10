import { useEffect, useState } from "react";
import axios from "axios";
import ClientLayout from "../../components/client/clientLayout";
import BookCard from "../../components/client/BookCard";

const Books = ({ keycloak }) => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ClientLayout keycloak={keycloak}>
      <div className="client-page-header">
        <h1>Nos Livres</h1>
        <p>Découvrez tous les livres disponibles.</p>
      </div>

      <div className="books-toolbar">
        <input
          type="text"
          placeholder="Rechercher un livre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="books-search"
        />
      </div>

      <div className="books-grid">
        {filteredBooks.length === 0 ? (
          <p>Aucun livre disponible.</p>
        ) : (
          filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} addToCart={addToCart} />
          ))
        )}
      </div>
    </ClientLayout>
  );
};

export default Books;