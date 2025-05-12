import { getCardHolderCurrent, handleFreeze, handleUnFreeze } from "@/api";
import { useUserSettingsStore } from "@/stores";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export const useCardHolder = () => {
  const [data, setData] = useState<UserCardInfo>({} as UserCardInfo);
  const { setIsFreezeCard, setCardStatus, cardStatus } = useUserSettingsStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCardHolderCurrent = async () => {
    try {
      const { data: session } = await getCardHolderCurrent();

      if (session) {
        setData(session);
        setIsFreezeCard(session?.cardStatus === 3);
        setCardStatus(session?.cardStatus);
      }
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loading && fetchCardHolderCurrent();
  }, [loading]);

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
      if (data?.cardStatus === 3) {
        await handleUnFreeze(data?.cardholderId || 0);
      } else {
        await handleFreeze(data?.cardholderId || 0);
      }
      fetchCardHolderCurrent();
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
    error,
    cardStatus
  };
};
