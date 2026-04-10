import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

const Authors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/authors")
      .then((res) => setAuthors(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AdminLayout>
      <h2 className="mb-4">Authors</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Nationalité</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {authors.map((author) => (
            <tr key={author._id}>
              <td>{author.nom}</td>
              <td>{author.prenom}</td>
              <td>{author.nationalite}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2">Modifier</button>
                <button className="btn btn-sm btn-danger">Supprimer</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Authors;