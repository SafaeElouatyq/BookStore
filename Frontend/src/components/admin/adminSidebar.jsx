import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-title">Book Store Admin</h2>

      <ul className="sidebar-menu">
        <li>
          <Link
            to="/admin/dashboard"
            className={location.pathname === "/admin/dashboard" ? "active" : ""}
          >
            Tableau de bord
          </Link>
        </li>

        <li>
          <Link
            to="/admin/books"
            className={location.pathname === "/admin/books" ? "active" : ""}
          >
            Livres
          </Link>
        </li>

        <li>
          <Link
            to="/admin/authors"
            className={location.pathname === "/admin/authors" ? "active" : ""}
          >
            Auteurs
          </Link>
        </li>

        <li>
          <Link
            to="/admin/categories"
            className={location.pathname === "/admin/categories" ? "active" : ""}
          >
            Catégories
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;