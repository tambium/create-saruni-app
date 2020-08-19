import React from "react";
import { jwtClient } from "@saruni/auth";
import { generateApiProvider } from "@saruni/web";

import { Auth } from "../components/auth";

const ApiProvider = generateApiProvider({ apolloClient: jwtClient });

const App = ({ Component, pageProps }) => {
  return (
    <ApiProvider>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </ApiProvider>
  );
};

export default App;
