import cors from "@middy/http-cors";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";

import { jwtMiddleware } from "@saruni/auth";

import { db } from "./../db";
import { createSendEmailVerificationLambda, baseOptions } from "@saruni/api";

export const handler = createSendEmailVerificationLambda({ db })
  .use(jsonBodyParser())
  .use(jwtMiddleware())
  .use(httpErrorHandler())
  .use(cors(baseOptions));
