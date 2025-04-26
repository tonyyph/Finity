import { getClerkInstance } from "@clerk/clerk-expo";
import { QueryClient } from "@tanstack/react-query";
import { getLocales } from "expo-localization";
import { tokenCache } from "./cache";
import { AppType } from "./type";
const { hc } = require("hono/dist/client") as typeof import("hono/client");

export const clerk = getClerkInstance({
  publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  tokenCache
});

export const getHonoClient = async () => {
  const token = await clerk.session?.getToken();

  // console.log(" getHonoClient 💯 token:", token);

  if (!token) {
    throw new Error("No token found");
  }
  const deviceLanguage = getLocales()[0].languageCode;
  const deviceCurrency = getLocales()[0]?.currencyCode;

  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (deviceLanguage) {
    headers["x-device-language"] = deviceLanguage;
  }

  if (deviceCurrency) {
    headers["x-device-currency"] = deviceCurrency;
  }

  return hc<AppType>(process.env.EXPO_PUBLIC_API_URL!, {
    headers
  });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
      staleTime: 1000 * 60 * 60 * 24 // 1 day
    }
  }
});
