import { getSettingProfile } from "@/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useSettingProfile = () => {
  const [data, setData] = useState<SettingProfileResponse>(
    {} as SettingProfileResponse
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSettingProfile = async () => {
      try {
        const { data: session } = await getSettingProfile();
        setData(session);
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettingProfile();
  }, []);

  return {
    settingProfile: data ?? ({} as SettingProfileResponse),
    loading: loading,
    error
  };
};
