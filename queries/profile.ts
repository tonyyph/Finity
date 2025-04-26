import { getHonoClient } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useSettingProfileQuery() {
  return useQuery({
    queryKey: ["setting/profile"],
    queryFn: async () => {
      const hc = await getHonoClient();
      const res = await hc.settings.profile.$get();

      if (!res.ok) {
        throw new Error(await res.text());
      }
      return await res.json();
    }
  });
}
