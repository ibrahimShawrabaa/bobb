import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthGuard from "./AuthGuard";

export default function Root({ children }) {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <AuthGuard>{children}</AuthGuard>
    </Auth0Provider>
  );
}
