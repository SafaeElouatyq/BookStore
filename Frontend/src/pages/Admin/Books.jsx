import axios from "axios";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";
import AdminLayout from "./AdminLayout";
import "../../styles/admin.css";

const BOOKS_API = "http://localhost:5000/api/books";
const AUTHORS_API = "http://localhost:5000/api/authors";
const CATEGORIES_API = "http://localhost:5000/api/categories";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mode, setMode] = useState("list");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: "",
  });

  const fetchBooks = async () => {
    try {
      const res = await axios.get(BOOKS_API);
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors du chargement des livres");
    }
  };

  const fetchAuthors = async () => {
    try {
      const res = await axios.get(AUTHORS_API);
      setAuthors(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORIES_API);
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchCategories();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      price: "",
      stock: "",
      image: "",
      category: "",
    });
    setEditingId(null);
  };

  const handleAddClick = () => {
    resetForm();
    setMode("add");
    setMessage("");
  };

  const handleEditClick = (book) => {
    setFormData({
      title: book.title || "",
      author: book.author?._id || "",
      description: book.description || "",
      price: book.price || "",
      stock: book.stock || "",
      image: book.image || "",
      category: book.category?._id || "",
    });
    setEditingId(book._id);
    setMode("edit");
    setMessage("");
  };

  const handleBackToList = () => {
    resetForm();
    setMode("list");
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      if (mode === "add") {
        const res = await axios.post(BOOKS_API, payload);
        setMessage(res.data.message);
      } else if (mode === "edit" && editingId) {
        const res = await axios.put(`${BOOKS_API}/${editingId}`, payload);
        setMessage(res.data.message);
      }

      await fetchBooks();
      handleBackToList();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Erreur serveur");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BOOKS_API}/${id}`);
      setMessage(res.data.message);
      fetchBooks();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Erreur serveur");
    }
  };

  return (
    <AdminLayout>
      <div className="page-header page-header-row">
        <div>
          <h1>Livres</h1>
          <p>Gérez les livres disponibles.</p>
        </div>

        {mode === "list" ? (
          <button className="btn-primary top-btn" onClick={handleAddClick}>
           
            + livre
          </button>
        ) : (
          <button className="btn-secondary top-btn" onClick={handleBackToList}>
            <ArrowLeft size={18} />
            Retour à la liste
          </button>
        )}
      </div>

      {message && <div className="alert-box">{message}</div>}

      {mode === "list" ? (
        <div className="admin-card">
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Auteur</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book) => (
                    <tr key={book._id}>
                      <td>{book.title}</td>
                      <td>
                        {book.author
                          ? `${book.author.nom} ${book.author.prenom}`
                          : "-"}
                      </td>
                      <td>{book.category ? book.category.name : "-"}</td>
                      <td>{book.price}</td>
                      <td>{book.stock}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="icon-btn edit-btn"
                            onClick={() => handleEditClick(book)}
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            className="icon-btn delete-btn"
                            onClick={() => handleDelete(book._id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      Aucun livre trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="admin-card form-card">
          <h2>{mode === "add" ? "Ajouter un livre" : "Modifier un livre"}</h2>

          <form className="admin-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Titre"
              value={formData.title}
              onChange={handleChange}
            />

            <select
              name="author"
              value={formData.author}
              onChange={handleChange}
            >
              <option value="">Sélectionner un auteur</option>
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.nom} {author.prenom}
                </option>
              ))}
            </select>

            <textarea
              name="description"
              placeholder="Description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Prix"
              value={formData.price}
              onChange={handleChange}
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
            />

            <input
              type="text"
              name="image"
              placeholder="URL de l'image"
              value={formData.image}
              onChange={handleChange}
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {mode === "add" ? "Ajouter" : "Mettre à jour"}
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleBackToList}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

export default Books;