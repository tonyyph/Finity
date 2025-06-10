import { useQueries } from "@tanstack/react-query";
import type { FC } from "react";
import { STORE_SYNC_INTERVAL } from "./stores.const";

export type StoreIntervalUpdateProps = {
  interval?: number;
};

export const StoreIntervalUpdate: FC<StoreIntervalUpdateProps> = ({
  interval = STORE_SYNC_INTERVAL
}) => {
  useQueries({
    queries: []
  });

  return null;
};
