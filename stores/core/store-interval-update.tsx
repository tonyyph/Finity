import { useAuth } from "@clerk/clerk-expo";
import { useQueries } from "@tanstack/react-query";
import type { FC } from "react";
import type { StoreHookQueryOptions } from "./stores";
import { STORE_SYNC_INTERVAL } from "./stores.const";

export type StoreIntervalUpdateProps = {
  interval?: number;
};

export const StoreIntervalUpdate: FC<StoreIntervalUpdateProps> = ({
  interval = STORE_SYNC_INTERVAL
}) => {
  const { isSignedIn } = useAuth();

  const queryOptions: StoreHookQueryOptions = {
    refetchInterval: interval,
    refetchIntervalInBackground: true,
    enabled: isSignedIn
  };

  useQueries({
    queries: []
  });

  return null;
};
