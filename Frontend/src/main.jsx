import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import keycloak from "./keyCloak.js";

keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
  })
  .then((authenticated) => {
    console.log("authenticated:", authenticated);

    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((err) => {
    console.error("Keycloak init error:", err);
  });