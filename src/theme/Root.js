import React from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useDocusaurusContext } from '@docusaurus/useDocusaurusContext';
import AuthGuard from "./AuthGuard";

export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const { Auth0Provider } = require("@auth0/auth0-react");
        const domain = siteConfig.customFields.AUTH0_DOMAIN;
        const clientId = siteConfig.customFields.AUTH0_CLIENT_ID;
        
        if (!domain || !clientId) {
          console.error('Auth0 environment variables are not set');
          return <div>Please check authentication configuration</div>;
        }

        return (
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
              redirect_uri: window.location.origin,
            }}
          >
            <AuthGuard>{children}</AuthGuard>
          </Auth0Provider>
        );
      }}
    </BrowserOnly>
  );
}