import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import keycloak from "./keyCloak.js";
import "./styles/admin.css";
import "./styles/client.css";

keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
  })
  .then((authenticated) => {
    console.log("authenticated:", authenticated);
    console.log("tokenParsed:", keycloak.tokenParsed);

    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App keycloak={keycloak} />
      </React.StrictMode>
    );
  })
  .catch((err) => {
    console.error("Keycloak init error:", err);
  });