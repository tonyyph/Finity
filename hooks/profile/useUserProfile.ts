import { getUserProfile } from "@/api";
import { useUserProfileStore } from "@/stores/user-profile/store";
import { userStore } from "@/stores/userStore";
import { useEffect, useLayoutEffect, useState } from "react";

export const useUserProfile = () => {
  const [data, setData] = useState<UserResponse>();
  const [loading, setLoading] = useState(true);
  const { isUpdateProfile, setIsUpdateProfile } = useUserProfileStore();

  useLayoutEffect(() => {
    setIsUpdateProfile(true);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: session } = await getUserProfile();
        userStore.setState({ userProfile: session });

        setData(session);
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
      } finally {
        setIsUpdateProfile(false);
        setLoading(false);
      }
    };

    !!isUpdateProfile && fetchUserProfile();
  }, [isUpdateProfile]);

  return {
    userProfile: data,
    loading: loading
  };
};
