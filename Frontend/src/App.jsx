import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
// import Books from "./pages/Admin/Books.jsx";
// import Authors from "./pages/Admin/Authors.jsx";
// import Categories from "./pages/Admin/Categories.jsx";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/admin.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/admin/books" element={<Books />} />
        <Route path="/admin/authors" element={<Authors />} />
        <Route path="/admin/categories" element={<Categories />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;