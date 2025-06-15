import { handleLoadCard } from "@/api";
import { parseError } from "@/utils/errors";
import { router } from "expo-router";
import { useState } from "react";

export const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (error: unknown) => {
    const parsed = parseError(error);
    setErrorMessage(parsed.message);
  };

  const loadCard = async (data: LoadCardRequest) => {
    setLoading(true);
    try {
      const { data: session } = await handleLoadCard(data);
      if (!!session) {
        router.push({
          pathname: "/transaction_result",
          params: {
            type: data?.type,
            amount: data?.pointsAmount,
            success: "true"
          }
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

  return {
    loading,
    error: errorMessage,
    setErrorMessage: (message: string) => setErrorMessage(message),
    loadCard
  };
};
