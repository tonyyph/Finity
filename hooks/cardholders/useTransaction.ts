import { getConfirmationDetails, handleLoadCard, handleSendPoint } from "@/api";
import { formatNumber } from "@/utils";
import { parseError } from "@/utils/errors";
import { router } from "expo-router";
import { useState } from "react";

type LoadCardCustomRequest = {
  totalPointsBalance?: string;
  pointsAmount: string;
  type?: string | undefined;
  cardBalance: string;
};
export const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [transDetailInfo, setTransDetailInfo] = useState<any>();

  const handleError = (error: unknown) => {
    const parsed = parseError(error);
    setErrorMessage(parsed.message);
  };

  const loadCard = async (data: LoadCardCustomRequest) => {
    setLoading(true);
    try {
      const { data: session } = await handleLoadCard(data);

      if (session?.referenceNumber) {
        router.push({
          pathname: "/transaction-result",
          params: {
            type: data?.type,
            transactionId: session.referenceNumber,
            amount: data.pointsAmount,
            totalPointsBalance: data.totalPointsBalance,
            totalCardBalance: formatNumber({
              value:
                Number(data.pointsAmount?.toString().replace(/,/g, "")) * 0.1 +
                Number(data.cardBalance?.toString().replace(/,/g, ""))
            }),
            success: "true"
          }
        });
      }
    } catch (error) {
      handleError(error);
      router.push({
        pathname: "/transaction-result",
        params: {
          type: data?.type,
          amount: data?.pointsAmount,
          success: "false"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const sendPoints = async (data: SendPointRequest) => {
    setLoading(true);
    try {
      const { data: session } = await handleSendPoint(data);

      if (!!session?.transactionId) {
        await getConfirmInfo({
          transId: session.transactionId,
          type: data?.type ?? ""
        });
      }
    } catch (error) {
      handleError(error);
      router.push({
        pathname: "/transaction-result",
        params: {
          type: data?.type,
          amount: data?.pointsAmount,
          success: "false"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const getConfirmInfo = async ({
    transId,
    type
  }: {
    transId: number;
    type: string;
  }) => {
    setLoading(true);
    try {
      const { data: session } = await getConfirmationDetails(transId);
      if (!session) {
        throw new Error("No session data found");
      }
      if (!!session) {
        router.push({
          pathname: "/transaction-result",
          params: {
            type,
            transactionId: transId,
            amount: session.amount,
            cardBalance: session.cardBalance,
            pointsBalance: session.pointBalance,
            dateTransacted: session.dateTransacted,
            destinationUserFullName: session.destinationUserFullName,
            email: session.email,
            success: "true"
          }
        });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionDetailInfo = async ({ transId }: { transId: number }) => {
    setLoading(true);
    try {
      const { data: session } = await getConfirmationDetails(transId);
      setTransDetailInfo(session);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToTransactionDetail = async ({
    transId,
    item,
    referenceNumber,
    type
  }: {
    transId: number;
    item: Transaction;
    referenceNumber?: string;
    type: string;
  }) => {
    router.push({
      pathname: `${
        type === "Card"
          ? "/transaction-card-detail"
          : "/transaction-point-detail"
      }`,
      params: {
        item: JSON.stringify(item),
        transactionId: transId,
        referenceNumber: referenceNumber
      }
    });
  };

  return {
    loading,
    error: errorMessage,
    setErrorMessage: (message: string) => setErrorMessage(message),
    getConfirmInfo,
    getTransactionDetailInfo,
    loadCard,
    sendPoints,
    handleToTransactionDetail,
    transDetailInfo
  };
};
