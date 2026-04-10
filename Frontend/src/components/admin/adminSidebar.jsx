import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-title">Book Admin</h2>

      <ul className="sidebar-menu">
        <li>
          <Link
            to="/admin/dashboard"
            className={location.pathname === "/admin/dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
        </li>

        {/* <li>
          <Link
            to="/admin/books"
            className={location.pathname === "/admin/books" ? "active" : ""}
          >
            Books
          </Link>
        </li> */}

        <li>
          <Link
            to="/admin/authors"
            className={location.pathname === "/admin/authors" ? "active" : ""}
          >
            Authors
          </Link>
        </li>

        <li>
          <Link
            to="/admin/categories"
            className={location.pathname === "/admin/categories" ? "active" : ""}
          >
            Categories
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;