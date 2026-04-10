import { Link, useLocation } from "react-router-dom";

const ClientNavbar = () => {
  const location = useLocation();

  return (
    <header className="client-navbar">
      <div className="client-navbar-container">
        <Link to="/" className="client-logo">
          BookStore
        </Link>

        <nav className="client-nav">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Accueil
          </Link>

          <Link
            to="/livres"
            className={location.pathname === "/livres" ? "active" : ""}
          >
            Livres
          </Link>

          <Link
            to="/panier"
            className={location.pathname === "/panier" ? "active" : ""}
          >
            Panier
          </Link>

          <Link
            to="/historique-commandes"
            className={
              location.pathname === "/historique-commandes" ? "active" : ""
            }
          >
            Historique
          </Link>

          <Link
            to="/deconnexion"
            className={location.pathname === "/deconnexion" ? "active" : ""}
          >
            Déconnexion
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default ClientNavbar;