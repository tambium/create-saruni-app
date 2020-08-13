import middy from "@middy/core";
import cors from "@middy/http-cors";
import httpErrorHandler from "@middy/http-error-handler";
import { cookieManager, jwtMiddleware } from "@saruni/auth";

export const handler = middy(cookieManager())
  .use(jwtMiddleware())
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true,
      headers:
        "Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token, X-Amz-User-Agent",
      origin: "http://localhost:3000",
    })
  );
