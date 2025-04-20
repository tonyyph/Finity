import { useUserQuery } from "@/queries/user";
import { userStore } from "@/stores/userStore";
import { useEffect, useState } from "react";

export const useUserProfile = () => {
  const [data, setData] = useState<UserProfile>({} as UserProfile);
  const [loading, setLoading] = useState(true);
  const { data: userData } = useUserQuery();

  useEffect(() => {
    if (userData) {
      setData(userData as UserProfile);
      userStore.setState({ userProfile: userData as UserProfile });
      setLoading(false);
    }
  }, [userData]);

  return {
    userProfile: data ?? userStore?.getState().userProfile,
    loading: loading
  };
};
