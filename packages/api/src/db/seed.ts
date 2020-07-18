import { db } from ".";

export const seed = async () => {
  try {
    /**
     *  Seeding logic.
     */
  } catch (e) {
    console.log(JSON.stringify(e));
  } finally {
    await db.disconnect();
  }
};
