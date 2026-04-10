import ClientNavbar from "./clientNavbar";

const ClientLayout = ({ children, keycloak }) => {
  return (
    <div className="client-layout">
      <ClientNavbar keycloak={keycloak} />
      <main className="client-main">{children}</main>
    </div>
  );
};

export default ClientLayout;