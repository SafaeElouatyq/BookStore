import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Admin
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import BooksAdmin from "./pages/Admin/Books.jsx";
import Authors from "./pages/Admin/Authors.jsx";
import Categories from "./pages/Admin/Categories.jsx";
import OrdersAdmin from "./pages/Admin/ordersAdmin.jsx";

// Client
import Home from "./pages/Client/Home.jsx";
import Books from "./pages/Client/Books.jsx";
import Cart from "./pages/Client/cart.jsx";
import OrdersHistory from "./pages/Client/orderHistory.jsx";

function App({ keycloak }) {
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  const isAdmin = roles.includes("admin");
  const isClient = roles.includes("client");

  return (
    <BrowserRouter>
      <Routes>
        {isAdmin && (
          <>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard keycloak={keycloak} />}
            />
            <Route
              path="/admin/books"
              element={<BooksAdmin keycloak={keycloak} />}
            />
            <Route
              path="/admin/authors"
              element={<Authors keycloak={keycloak} />}
            />
            <Route
              path="/admin/categories"
              element={<Categories keycloak={keycloak} />}
            />
            <Route
              path="/admin/orders"
              element={<OrdersAdmin keycloak={keycloak} />}
            />
            <Route path="*" element={<Navigate to="/admin/dashboard" />} />
          </>
        )}

        {isClient && !isAdmin && (
          <>
            <Route path="/" element={<Home keycloak={keycloak} />} />
            <Route path="/livres" element={<Books keycloak={keycloak} />} />
            <Route path="/panier" element={<Cart keycloak={keycloak} />} />
            <Route
              path="/historique-commandes"
              element={<OrdersHistory keycloak={keycloak} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;