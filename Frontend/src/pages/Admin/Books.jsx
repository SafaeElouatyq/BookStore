import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import "../../styles/admin.css";

const Books = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: "",
  });

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAuthors();
    fetchCategories();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/authors");
      setAuthors(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      const res = await axios.post("http://localhost:5000/api/books", payload);
      setMessage(res.data.message);
      resetForm();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Erreur serveur");
    }
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Livres</h1>
        <p>Ajoutez un nouveau livre.</p>
      </div>

      {message && <div className="alert-box">{message}</div>}

      <div className="admin-card single-card">
        <h2>Ajouter un livre</h2>

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
              Ajouter le livre
            </button>
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Réinitialiser
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Books;