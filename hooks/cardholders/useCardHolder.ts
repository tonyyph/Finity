import { useUserSettingsStore } from "@/stores";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  getCardHolderCurrent,
  handleFreeze,
  handleUnFreeze
} from "./../../api/restful";

export const useCardHolder = () => {
  const [data, setData] = useState<UserCardInfo>({} as UserCardInfo);
  const { isFreezeCard, setIsFreezeCard } = useUserSettingsStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCardHolderCurrent = async () => {
      try {
        const { data: session } = await getCardHolderCurrent();
        setData(session);
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCardHolderCurrent();
  }, []);

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
        await handleUnFreeze(data?.cardholderId || 0);
      } else {
        await handleFreeze(data?.cardholderId || 0);
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
    isFreezeCard,
    error
  };
};
