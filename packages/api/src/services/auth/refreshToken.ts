import middy from "@middy/core";
import cors from "@middy/http-cors";
import httpErrorHandler from "@middy/http-error-handler";
import { refreshToken } from "@saruni/auth";

export const handler = middy(refreshToken())
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true,
      headers:
        "Content-Type, X-Amz-Date, Cookie, Authorization, X-Api-Key, X-Amz-Security-Token, X-Amz-User-Agent",
      origin: "http://localhost:3000",
    })
  );
