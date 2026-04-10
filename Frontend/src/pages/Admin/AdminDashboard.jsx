import AdminLayout from "./AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Tableau de bord</h1>
        <p>Bienvenue dans l’espace d’administration.</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Livres</h3>
          <p>Gérer les livres disponibles.</p>
        </div>

        <div className="dashboard-card">
          <h3>Auteurs</h3>
          <p>Ajouter, modifier ou supprimer des auteurs.</p>
        </div>

        <div className="dashboard-card">
          <h3>Catégories</h3>
          <p>Organiser les livres par catégorie.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;