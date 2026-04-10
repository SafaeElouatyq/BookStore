import ClientLayout from "../../components/client/clientLayout";

const OrdersHistory = () => {
  return (
    <ClientLayout>
      <div className="client-page-header">
        <h1>Historique des commandes</h1>
        <p>Vos commandes précédentes seront affichées ici.</p>
      </div>
    </ClientLayout>
  );
};

export default OrdersHistory;