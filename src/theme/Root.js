import React from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthGuard from "./AuthGuard";

export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  
  // Debug: log the values during build
  console.log('Auth0 Domain:', siteConfig.customFields.AUTH0_DOMAIN);
  console.log('Auth0 Client ID:', siteConfig.customFields.AUTH0_CLIENT_ID);
  
  return (
    <BrowserOnly fallback={<div>Loading authentication...</div>}>
      {() => {
        const { Auth0Provider } = require("@auth0/auth0-react");
        const domain = siteConfig.customFields.AUTH0_DOMAIN;
        const clientId = siteConfig.customFields.AUTH0_CLIENT_ID;
        
        // More debug info
        console.log('Browser - Auth0 Domain:', domain);
        console.log('Browser - Auth0 Client ID:', clientId);
        console.log('Window origin:', window.location.origin);
        
        if (!domain || !clientId) {
          console.error('Auth0 environment variables are missing!');
          console.error('Domain:', domain);
          console.error('Client ID:', clientId);
          return (
            <div style={{padding: '20px', textAlign: 'center'}}>
              <h3>Authentication Configuration Error</h3>
              <p>Please check your Auth0 environment variables.</p>
              <p>Domain: {domain || 'MISSING'}</p>
              <p>Client ID: {clientId || 'MISSING'}</p>
            </div>
          );
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