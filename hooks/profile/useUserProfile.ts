import { getUserProfile } from "@/api";
import { userStore } from "@/stores";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useUserProfile = () => {
  const [data, setData] = useState<UserProfile>({} as UserProfile);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserProfile = async () => {
    try {
      const { data: session } = await getUserProfile();
      setData(session);
      userStore.setState({ userProfile: session as UserProfile });
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loading && fetchUserProfile();
  }, [loading]);

  return {
    userProfile: data ?? userStore?.getState().userProfile,
    loading: loading,
    error
  };
};
