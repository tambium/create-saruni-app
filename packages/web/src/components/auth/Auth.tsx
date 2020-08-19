import React from "react";
import { AuthContext, useJwt } from "@saruni/auth";

export const Auth: React.FC = (props) => {
  const { setToken } = useJwt();

  return (
    <AuthContext.Provider
      value={{
        defaultRedirect: "/",
        isAuthenticated: false,
        loading: false,
        login: () => {},
        logout: () => {},
        signup: () => {},
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
