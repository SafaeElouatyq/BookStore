import { useEffect, useState } from "react";
import axios from "axios";
import ClientLayout from "../../components/client/clientLayout";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setMessage("Utilisateur non connecté");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/orders/my-orders/${user.keycloakId}`
      );

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
    <ClientLayout>
      <div className="client-page-header">
        <h1>Historique des commandes</h1>
        <p>Consultez toutes vos commandes précédentes.</p>
      </div>

      {message && <div className="client-alert">{message}</div>}

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>Aucune commande trouvée</h2>
            <p>Vous n’avez pas encore passé de commande.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <div>
                  <h3>Commande #{order._id.slice(-6).toUpperCase()}</h3>
                  <p>Date : {formatDate(order.createdAt)}</p>
                </div>

                <div
                  className={`order-status ${
                    order.status === "Livrée" ? "delivered" : "pending"
                  }`}
                >
                  {order.status}
                </div>
              </div>

              <div className="order-books">
                {order.items.map((item, index) => (
                  <div className="order-book-row" key={index}>
                    <span>
                      {item.title} ({item.quantity})
                    </span>
                    <span>{item.price * item.quantity} DH</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <strong>Total :</strong>
                <strong>{order.totalAmount} DH</strong>
              </div>
            </div>
          ))
        )}
      </div>
    </ClientLayout>
  );
};

export default OrdersHistory;