import { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import ClientLayout from "../../components/client/clientLayout";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <ClientLayout>
      <div className="client-page-header">
        <h1>Panier</h1>
        <p>Consultez les livres ajoutés à votre panier.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <ShoppingCart size={48} />
          <h2>Votre panier est vide</h2>
          <p>Ajoutez des livres depuis la page des livres.</p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-card" key={item._id}>
                <img
                  src={item.image || "https://via.placeholder.com/120"}
                  alt={item.title}
                  className="cart-image"
                />

                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p className="cart-author">
                    {item.author?.nom} {item.author?.prenom}
                  </p>
                  <p className="cart-price">{item.price} DH</p>
                </div>

                <div className="cart-actions">
                  <div className="quantity-box">
                    <button onClick={() => decreaseQuantity(item._id)}>
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item._id)}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Résumé</h2>

            <div className="summary-row">
              <span>Nombre d’articles</span>
              <strong>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Total</span>
              <strong>{totalPrice} DH</strong>
            </div>

            <button className="checkout-btn">
              Valider la commande
            </button>
          </div>
        </div>
      )}
    </ClientLayout>
  );
};

export default Cart;