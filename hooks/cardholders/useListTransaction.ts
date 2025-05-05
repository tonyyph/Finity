import { getCardTransaction, getPointTransaction } from "@/api";
import { useCallback, useState } from "react";

export const useListTransaction = () => {
  const [loading, setLoading] = useState(true);
  const [cardList, setCardList] = useState<Transaction[]>([]); //   try {
  const [pointList, setPointList] = useState<Transaction[]>([]); //   try {

  const fetchPaginatedCardTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const { data: session } = await getCardTransaction({
        cursor: "0",
        take: "20",
        search: ""
      });

      setCardList(session?.data || []);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPaginatedPointTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const { data: session } = await getPointTransaction({
        cursor: "0",
        take: "20",
        search: ""
      });

      setPointList(session?.data || []);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    cardList,
    pointList,
    fetchPaginatedCardTransactions,
    fetchPaginatedPointTransactions
  };
};
