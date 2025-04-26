import { Hono } from "hono";
import authApp from "./routes/auth";
import cardHolderApp from "./routes/cardholders";
import settingsApp from "./routes/settings";
import usersApp from "./routes/user";

export const hono = new Hono()
  .get("/health", (c) => c.text("ok"))

  .route("/auth", authApp)
  .route("/user", usersApp)
  .route("/cardholders", cardHolderApp)
  .route("/settings", settingsApp);
