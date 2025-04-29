import { useCardHolderQuery, UserCardInfo } from "@/queries/cardholder";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export const useCardHolder = () => {
  const [data, setData] = useState<UserCardInfo>({} as UserCardInfo);
  const { data: userData } = useCardHolderQuery();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userData) return;
    setData(userData as UserCardInfo);
  }, [userData]);

  const handleRequestCard = () => {
    router.navigate({
      pathname: "/request_card"
    });
  };

  const handleActiveCard = () => {
    router.navigate({
      pathname: "/active_card"
    });
  };

  const handleReport = () => {
    router.navigate({
      pathname: "/report_damaged"
    });
  };

  return {
    loading,
    userData: data,
    handleRequestCard,
    handleActiveCard,
    handleReport
  };
};
