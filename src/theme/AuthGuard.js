import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function AuthGuard({ children }) {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? children : null;
}
