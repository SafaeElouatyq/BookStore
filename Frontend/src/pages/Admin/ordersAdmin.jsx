import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors du chargement des commandes");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR");
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h1>Commandes</h1>
        <p>Gérez toutes les commandes des clients.</p>
      </div>

      {message && <div className="alert-box">{message}</div>}

      <div className="admin-card">
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Commande</th>
                <th>Client</th>
                <th>Email</th>
                <th>Total</th>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-6).toUpperCase()}</td>
                    <td>{order.user?.username || "-"}</td>
                    <td>{order.user?.email || "-"}</td>
                    <td>{order.totalAmount} DH</td>
                    <td>{order.status}</td>
                    <td>{formatDate(order.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-row">
                    Aucune commande trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersAdmin;