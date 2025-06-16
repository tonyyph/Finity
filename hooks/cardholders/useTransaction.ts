import { getConfirmationDetails, handleLoadCard, handleSendPoint } from "@/api";
import { parseError } from "@/utils/errors";
import { router } from "expo-router";
import { useState } from "react";

export const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (error: unknown) => {
    const parsed = parseError(error);

    console.log(" handleError 💯 parsed:", parsed);

    setErrorMessage(parsed.message);
  };

  const loadCard = async (data: LoadCardRequest) => {
    setLoading(true);
    try {
      const { data: session } = await handleLoadCard(data);
      if (!!session?.transactionId) {
        await getConfirmInfo({
          transId: session.transactionId,
          type: data?.type ?? ""
        });
      }
    } catch (error) {
      handleError(error);
      router.push({
        pathname: "/transaction_result",
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
        pathname: "/transaction_result",
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
          pathname: "/transaction_result",
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

      console.log(" getConfirmInfo 💯 session:", session);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionDetailInfo = async ({
    transId,
    item
  }: {
    transId: number;
    item: Transaction;
  }) => {
    setLoading(true);
    try {
      const { data: session } = await getConfirmationDetails(transId);

      if (!session) {
        throw new Error("No session data found");
      }
      if (!!session) {
        router.push({
          pathname: "/point_received",
          params: {
            item: JSON.stringify(item),
            detail: JSON.stringify(session),
            transactionId: transId
          }
        });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error: errorMessage,
    setErrorMessage: (message: string) => setErrorMessage(message),
    getConfirmInfo,
    getTransactionDetailInfo,
    loadCard,
    sendPoints
  };
};
