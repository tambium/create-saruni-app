import * as React from "react";

import { generateApiProvider } from "@saruni/web";

const ApiProvider = generateApiProvider();

const App = ({ Component, pageProps }) => {
  return (
    <ApiProvider>
      <Component {...pageProps} />
    </ApiProvider>
  );
};

export default App;
