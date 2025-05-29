import { handleLoadCard } from "@/api";
import { router } from "expo-router";
import { useState } from "react";

export const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const loadCard = async (data: LoadCardRequest) => {
    setLoading(true);
    try {
      const { data: session } = await handleLoadCard(data);

      console.log(" loadCard 💯 session:", session);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
      router.back();
    }
  };

  return {
    loading,
    loadCard
  };
};
