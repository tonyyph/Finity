import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";

const router = new Hono().get("/profile", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json({ message: "unauthorized" }, 401);
  }

  return c.json(auth?.userId);
});

export default router;
