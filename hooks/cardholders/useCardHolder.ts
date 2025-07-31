import {
  activeCard,
  getCardHolderCurrent,
  getCardHolders,
  handleFreeze,
  handleUnFreeze,
  reportOrDamageCard,
  requestCard
} from "@/api";
import { useUserAuthenticateStore } from "@/stores";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { getPINInfo } from "./../../api/restful";

export const useCardHolder = () => {
  const [data, setData] = useState<UserCardInfo>({} as UserCardInfo);
  const [listCardHolder, setListCardHolder] = useState<UserCardHolder[]>([]);
  const { showBottomSheetPin, setShowBottomSheetPin, setPinInfo, pinInfo } =
    useUserAuthenticateStore();
  const [loading, setLoading] = useState(false);
  const [freezeLoading, setFreezeLoading] = useState(false);
  const [error, setError] = useState("");

  const getPINDetailInfo = async () => {
    try {
      const { data: session } = await getPINInfo();
      setPinInfo(session.pin);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchCardHolderCurrent = async () => {
    setLoading(true);
    try {
      const { data: session } = await getCardHolderCurrent();

      if (session) {
        setData(session);
      }
    } catch (error) {
      setLoading(false);
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchCardHolderCurrent();
  }, []);

  const fetchListCardHolder = async () => {
    try {
      const { data: session } = await getCardHolders();
      if (session) {
        setListCardHolder(session);
      }
    } catch (error) {
      setLoading(false);
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestCard = () => {
    router.navigate({
      pathname: "/request_card"
    });
  };

  const handleActiveCard = () => {
    router.navigate({
      pathname: "/active-card"
    });
  };

  const handleReport = () => {
    router.navigate({
      pathname: "/report-damaged"
    });
  };

  const handleFreezeCard = async () => {
    setFreezeLoading(true);
    try {
      if (data?.cardStatus === 3) {
        await handleUnFreeze(data?.cardholderId || 0);
      } else {
        await handleFreeze(data?.cardholderId || 0);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      fetchCardHolderCurrent();
      setFreezeLoading(false);
    }
  };

  const handleRequestCardHolder = async (data: RequestCardInfo) => {
    setLoading(true);
    try {
      await requestCard(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      fetchCardHolderCurrent();
      setLoading(false);
      router.back();
    }
  };

  const handleActivateCard = async (last4Digits: string) => {
    setLoading(true);
    try {
      await activeCard(last4Digits);

      router.replace({
        pathname: "/active-card-success"
      });
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      fetchCardHolderCurrent();
      setLoading(false);
    }
  };
  const handleReportOrDamaged = async (isDamaged: boolean) => {
    setLoading(true);
    try {
      await reportOrDamageCard(isDamaged);
      router.push({
        pathname: "/(app)/request-card-success"
      });
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      fetchCardHolderCurrent();
      setLoading(false);
    }
  };

  return {
    loading,
    freezeLoading,
    userData: data,
    handleRequestCard,
    handleActiveCard,
    handleReport,
    handleFreezeCard,
    error,
    handleActivateCard,
    handleReportOrDamaged,
    listCardHolder,
    fetchListCardHolder,
    fetchCardHolderCurrent,
    handleRequestCardHolder,
    showBottomSheetPin,
    getPINDetailInfo,
    setShowBottomSheetPin,
    PINInfo: pinInfo
  };
};
