import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

const onRedirectCallback = (appState) => {
  console.log("redirect callback");
  console.log(appState);
  if (appState) {
    console.log("redirecting");
    window.location.href = appState.returnTo;
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/all/1`,
        audience: audience,
      }}
      onRedirectCallback={onRedirectCallback}
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
