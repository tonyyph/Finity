import { getHonoClient } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const hc = await getHonoClient();
      const res = await hc.user.$get();

      if (!res.ok) {
        throw new Error(await res.text());
      }
      return await res.json();
    }
  });
}
