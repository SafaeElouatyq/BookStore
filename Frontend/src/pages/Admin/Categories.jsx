import axios from "axios";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";
import AdminLayout from "./AdminLayout";
import "../../styles/admin.css";

const API = "http://localhost:5000/api/categories";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [mode, setMode] = useState("list");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API);
      setCategories(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors du chargement des catégories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });
    setEditingId(null);
  };

  const handleAddClick = () => {
    resetForm();
    setMode("add");
    setMessage("");
  };

  const handleEditClick = (category) => {
    setFormData({
      name: category.name,
      description: category.description || "",
    });
    setEditingId(category._id);
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
      if (mode === "add") {
        const res = await axios.post(API, formData);
        setMessage(res.data.message);
      } else if (mode === "edit" && editingId) {
        const res = await axios.put(`${API}/${editingId}`, formData);
        setMessage(res.data.message);
      }

      await fetchCategories();
      handleBackToList();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Erreur serveur");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API}/${id}`);
      setMessage(res.data.message);
      fetchCategories();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Erreur serveur");
    }
  };

  return (
    <AdminLayout>
      <div className="page-header page-header-row">
        <div>
          <h1>Catégories</h1>
          <p>Gérez les catégories des livres.</p>
        </div>

        {mode === "list" ? (
          <button className="btn-primary top-btn" onClick={handleAddClick}>
            
             + catégorie
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
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>{category.description || "-"}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="icon-btn edit-btn"
                            onClick={() => handleEditClick(category)}
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            className="icon-btn delete-btn"
                            onClick={() => handleDelete(category._id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="empty-row">
                      Aucune catégorie trouvée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="admin-card form-card">
          <h2>
            {mode === "add" ? "Ajouter une catégorie" : "Modifier une catégorie"}
          </h2>

          <form className="admin-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nom de la catégorie"
              value={formData.name}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
            />

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

export default Categories;