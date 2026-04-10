import axios from "axios";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";
import AdminLayout from "./AdminLayout";
import "../../styles/admin.css";

const API = "http://localhost:5000/api/authors";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [mode, setMode] = useState("list"); 
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    nationalite: "",
  });

  const fetchAuthors = async () => {
    try {
      const res = await axios.get(API);
      setAuthors(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors du chargement des auteurs");
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      nationalite: "",
    });
    setEditingId(null);
  };

  const handleAddClick = () => {
    resetForm();
    setMode("add");
    setMessage("");
  };

  const handleEditClick = (author) => {
    setFormData({
      nom: author.nom,
      prenom: author.prenom,
      nationalite: author.nationalite,
    });
    setEditingId(author._id);
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

      await fetchAuthors();
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
      fetchAuthors();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Erreur serveur");
    }
  };

  return (
    <AdminLayout>
      <div className="page-header page-header-row">
        <div>
          <h1>Auteurs</h1>
          <p>Gérez les auteurs de votre bibliothèque.</p>
        </div>

        {mode === "list" ? (
          <button className="btn-primary top-btn" onClick={handleAddClick}>
            <Plus size={18} />
            Ajouter un auteur
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
                  <th>Prénom</th>
                  <th>Nationalité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {authors.length > 0 ? (
                  authors.map((author) => (
                    <tr key={author._id}>
                      <td>{author.nom}</td>
                      <td>{author.prenom}</td>
                      <td>{author.nationalite}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="icon-btn edit-btn"
                            onClick={() => handleEditClick(author)}
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            className="icon-btn delete-btn"
                            onClick={() => handleDelete(author._id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-row">
                      Aucun auteur trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="admin-card form-card">
          <h2>{mode === "add" ? "Ajouter un auteur" : "Modifier un auteur"}</h2>

          <form className="admin-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
            />

            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
            />

            <input
              type="text"
              name="nationalite"
              placeholder="Nationalité"
              value={formData.nationalite}
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

export default Authors;