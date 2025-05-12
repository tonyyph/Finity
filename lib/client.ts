import { getClerkInstance } from "@clerk/clerk-expo";
import { QueryClient } from "@tanstack/react-query";
import { tokenCache } from "./cache";

export const clerk = getClerkInstance({
  publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  tokenCache
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
      staleTime: 1000 * 60 * 60 * 24 // 1 day
    }
  }
});
