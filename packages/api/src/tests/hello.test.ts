import { createTestContext } from "@saruni/test";

import { db } from "../db";

describe("Hello test", () => {
  const ctx = createTestContext(db);

  test("Should return the 'Hello, Saruni!'", async () => {
    const result = await ctx.executeGraphql(`
      {
        hello
      }`);

    expect(result.data.hello).toBe("Hello, Saruni!");
  });
});
