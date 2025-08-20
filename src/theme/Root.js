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
        
        // HARDCODE YOUR ACTUAL VALUES HERE:
        const domain = "dev-pzuictiq8smmu7pv.auth0.com";
        const clientId = "O8oQj8v2Bdfkp8dCMQBHCd2fHrZOpAFD";
        
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