import { Link } from "react-router-dom";
import ClientLayout from "../../components/client/clientLayout.jsx";

const Home = () => {
  return (
    <ClientLayout>
      <section className="home-hero">
        <div className="home-hero-text">
          <h1>Bienvenue dans notre BookStore</h1>
          <p className="home-description">
            Découvrez des livres variés, ajoutez vos favoris au panier
            et consultez l’historique de vos commandes.
          </p>

          <div className="home-actions">
            <Link to="/livres" className="client-btn primary-btn">
              Voir les livres
            </Link>

            <Link to="/panier" className="client-btn secondary-btn">
              Voir le panier
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Notre service</h2>
        <div className="home-cards">
          <div className="home-card">
            <h3>Livres variés</h3>
            <p>Explorez plusieurs catégories de livres.</p>
          </div>

          <div className="home-card">
            <h3>Panier simple</h3>
            <p>Ajoutez et gérez facilement vos livres.</p>
          </div>

          <div className="home-card">
            <h3>Suivi des commandes</h3>
            <p>Consultez votre historique en toute simplicité.</p>
          </div>
        </div>
      </section>
    </ClientLayout>
  );
};

export default Home;