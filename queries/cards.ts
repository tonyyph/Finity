import { getHonoClient } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useCardPINQuery({
  verificationCode
}: {
  verificationCode: string;
}) {
  return useQuery({
    queryKey: ["cards/pin"],
    queryFn: async () => {
      const hc = await getHonoClient();
      const res = await hc.cards.pin.$post({
        json: {
          otp: verificationCode
        }
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      return await res.json();
    }
  });
}
