import {
  activeCard,
  getCardHolderCurrent,
  handleFreeze,
  handleUnFreeze,
  reportOrDamageCard
} from "@/api";
import { useUserSettingsStore } from "@/stores";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export const useCardHolder = () => {
  const [data, setData] = useState<UserCardInfo>({} as UserCardInfo);
  const {
    setIsFreezeCard,
    isFreezeCard,
    setCardStatus,
    cardStatus,
    setActiveCard,
    setIsDisableCard,
    setIsDamagedCard
  } = useUserSettingsStore();

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
      setLoading(false);
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
      if (isFreezeCard) {
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

  const handleActivateCard = async (last4Digits: string) => {
    setLoading(true);
    try {
      await activeCard(last4Digits);

      setActiveCard(2);
      setIsDisableCard(false);
      fetchCardHolderCurrent();
      router.replace({
        pathname: "/active_card_success"
      });
    } catch (error) {
      console.log("1", error);
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };
  const handleReportOrDamaged = async (isDamaged: boolean) => {
    setLoading(true);
    try {
      await reportOrDamageCard(isDamaged);
      if (!isDamaged) {
        setIsDisableCard(true);
        setActiveCard(1);
      } else {
        setIsDamagedCard(true);
      }
      router.push({
        pathname: "/(app)/request_card_success"
      });
      fetchCardHolderCurrent();
    } catch (error) {
      setError((error as AxiosError).message);
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
    cardStatus,
    isFreezeCard,
    handleActivateCard,
    handleReportOrDamaged
  };
};
