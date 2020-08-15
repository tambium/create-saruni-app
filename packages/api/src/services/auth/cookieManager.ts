import middy from "@middy/core";
import cors from "@middy/http-cors";
import httpErrorHandler from "@middy/http-error-handler";
import { cookieManager, jwtMiddleware } from "@saruni/auth";

import saruniJson from "../../../../../saruni.json";

let corsOptions = {
  credentials: true,
  headers:
    "Content-Type, X-Amz-Date, Cookie, Authorization, X-Api-Key, X-Amz-Security-Token, X-Amz-User-Agent",
};

if (process.env.STAGE === "prod") {
  corsOptions.origin = saruniJson.serverless.prod.frontendUrl;
} else {
  corsOptions.origins = [
    saruniJson.serverless.dev.frontendUrl,
    saruniJson.serverless.dev.frontendCloudfrontUrl,
    `http://localhost:${saruniJson.devServerPort.web}`,
  ];
}

export const handler = middy(cookieManager())
  .use(jwtMiddleware())
  .use(httpErrorHandler())
  .use(cors(corsOptions));
