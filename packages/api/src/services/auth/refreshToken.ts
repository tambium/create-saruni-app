import middy from "@middy/core";
import cors from "@middy/http-cors";
import httpErrorHandler from "@middy/http-error-handler";
import { refreshToken } from "@saruni/auth";

import saruniJson from "../../../../../saruni.json";

let corsOptions = {
  credentials: true,
  headers:
    "Content-Type, X-Amz-Date, Cookie, Authorization, X-Api-Key, X-Amz-Security-Token, X-Amz-User-Agent",
};

if (process.env.STAGE === "prod") {
  corsOptions.origin = saruniJson.serverless.prod.frontendUrl;
} else if (process.env.STAGE === "dev") {
  corsOptions.origins = [
    saruniJson.serverless.dev.frontendUrl,
    saruniJson.serverless.dev.frontendCloudfrontUrl,
    saruniJson.devServerEndpoint.web,
  ];
}
export const handler = middy(refreshToken())
  .use(httpErrorHandler())
  .use(cors(corsOptions));
