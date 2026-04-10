import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Admin
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import BooksAdmin from "./pages/Admin/Books.jsx";
import Authors from "./pages/Admin/Authors.jsx";
import Categories from "./pages/Admin/Categories.jsx";

// Client
import Home from "./pages/Client/Home.jsx";
import Books from "./pages/Client/Books.jsx";
import Cart from "./pages/Client/cart.jsx";
import OrdersHistory from "./pages/Client/orderHistory.jsx";


import "./styles/admin.css";
import "./styles/client.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client */}
        <Route path="/" element={<Home />} />
        <Route path="/livres" element={<Books />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/historique-commandes" element={<OrdersHistory />} />


        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<BooksAdmin />} />
        <Route path="/admin/authors" element={<Authors />} />
        <Route path="/admin/categories" element={<Categories />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;