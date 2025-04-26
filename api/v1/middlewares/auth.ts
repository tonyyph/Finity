import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const getAuthUser = (c: Context) => c.get("user") as any | null;

export const getAuthUserStrict = (c: Context) => {
  const user = getAuthUser(c);
  if (!user) {
    throw new HTTPException(401, { message: "unauthorized" });
  }
  return user;
};
