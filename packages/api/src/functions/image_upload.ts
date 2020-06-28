import { createImageUpload } from "@saruni/api";
import { jwtMiddleware } from "@saruni/auth";

export const handler = createImageUpload({ auth: jwtMiddleware() });
