import { useCardHolderQuery, UserCardInfo } from "@/queries/cardholder";
import { useUserSettingsStore } from "@/stores";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { handleFreeze, handleUnFreeze } from "./../../api/restful";

export const useCardHolder = () => {
  const [data, setData] = useState<UserCardInfo>({} as UserCardInfo);
  const { isFreezeCard, setIsFreezeCard } = useUserSettingsStore();
  const { data: userData } = useCardHolderQuery();
  const { cardholderId } = userData || {};
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

  const handleFreezeCard = async () => {
    setLoading(true);
    try {
      if (isFreezeCard) {
        await handleUnFreeze(cardholderId || 0);
      } else {
        await handleFreeze(cardholderId || 0);
      }
      setIsFreezeCard(!isFreezeCard);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    userData: data,
    handleRequestCard,
    handleActiveCard,
    handleReport,
    handleFreezeCard,
    isFreezeCard
  };
};
