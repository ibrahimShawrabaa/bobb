import React from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthGuard from "./AuthGuard";

export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <BrowserOnly fallback={<div>Loading authentication...</div>}>
      {() => {
        const { Auth0Provider } = require("@auth0/auth0-react");
        
        // REPLACE THESE WITH YOUR ACTUAL AUTH0 VALUES:
        const domain = "dev-pzuictiq8smmu7pv.auth0.com"; // ← Your Auth0 domain from the login page
        const clientId = "O8oQj8v2Bdfkp8dCMQBHCd2fHrZOpAFD"; // ← This looks like your client ID from the URL
        
        console.log('Using Auth0 Domain:', domain);
        console.log('Using Auth0 Client ID:', clientId);

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