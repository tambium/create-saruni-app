import { createApiTestContext } from "@saruni/test";

import { db } from "../src/db";

describe("Hello test", () => {
  const ctx = createApiTestContext(db);

  test("Should return the 'Hello, Saruni!'", async () => {
    const result = await ctx.executeGraphql(`
      {
        hello
      }`);

    expect(result.data.hello).toBe("Hello, Saruni!");
  });
});
