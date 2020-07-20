import { createVerifyEmailLambda, baseOptions } from "@saruni/api";
import { jwtMiddleware } from "@saruni/auth";
import cors from "@middy/http-cors";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import jsonBodyParser from "@middy/http-json-body-parser";

import { db } from "./../db";

createVerifyEmailLambda({ db })
  .use(jsonBodyParser())
  .use(
    validator({
      inputSchema: {
        required: ["body"],
        type: "object",
        properties: {
          body: {
            type: "object",
            properties: {
              token: {
                type: "string",
              },
              code: {
                type: "string",
              },
            },
          },
        },
      },
    })
  )
  .use(jwtMiddleware())
  .use(httpErrorHandler())
  .use(cors(baseOptions));
