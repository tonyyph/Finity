import { getHonoClient } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

interface UserCardInfo {
  cardBalance: number;
  cardStatus: number;
  cardholderId: number;
  dateCreated: string; // ISO datetime string
  dateLastLoggedIn: string; // ISO datetime string
  deliveryType: string; // e.g., "PC"
  email: string;
  firstName: string;
  hasIssuedCard: boolean;
  last4Digits: string;
  lastName: string;
  pointsBalance: number;
  publicToken: string;
  userId: number;
  userStatus: number;
}

export function useCardHolderQuery() {
  return useQuery({
    queryKey: ["cardholder/current"],
    queryFn: async () => {
      const hc = await getHonoClient();
      const res = await hc.cardholders.current.$get();

      if (!res.ok) {
        throw new Error(await res.text());
      }
      return (await res.json()) as UserCardInfo;
    }
  });
}
