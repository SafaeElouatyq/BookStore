import ClientNavbar from "./clientNavbar.jsx";

const ClientLayout = ({ children }) => {
  return (
    <div className="client-layout">
      <ClientNavbar />
      <main className="client-main">{children}</main>
    </div>
  );
};

export default ClientLayout;