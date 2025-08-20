import React from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import AuthGuard from "./AuthGuard";

export default function Root({ children }) {
  return (
    <BrowserOnly fallback={<div>Loading authentication...</div>}>
      {() => {
        const { Auth0Provider } = require("@auth0/auth0-react");
        
        // HARDCODED VALUES
        const domain = "dev-pzuictiq8smmu7pv.auth0.com";
        const clientId = "O8oQj8v2Bdfkp8dCMQBHCd2fHrZOpAFD";
        
        console.log('Auth0 Provider initialized with:', { domain, clientId });

        return (
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
              redirect_uri: window.location.origin,
            }}
            onRedirectCallback={(appState) => {
              console.log('Auth0 redirect callback:', appState);
            }}
          >
            <AuthGuard>{children}</AuthGuard>
          </Auth0Provider>
        );
      }}
    </BrowserOnly>
  );
}