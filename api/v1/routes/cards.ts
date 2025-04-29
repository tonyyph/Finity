import { getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const router = new Hono().post(
  "/pin",
  zValidator(
    "json",
    z.object({
      otp: z.string()
    })
  ),
  async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ message: "unauthorized" }, 401);
    }

    return c.json(auth?.userId);
  }
);

export default router;
