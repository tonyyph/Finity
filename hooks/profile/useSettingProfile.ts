import { getSettingProfile } from "@/api";
import { AxiosError } from "axios";
import { useState } from "react";

export const useSettingProfile = () => {
  const [data, setData] = useState<UserValue>({} as UserValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return {
    fetchSettingProfile,
    settingProfile: data,
    loading: loading,
    error
  };
};
