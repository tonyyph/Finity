import { getCardTransaction, getPointTransaction } from "@/api";
import { validateLetter } from "@/utils";
import { useCallback, useState } from "react";
import { useValidateInput } from "../commons";

export const useListTransaction = () => {
  const [loading, setLoading] = useState(true);
  const [cardList, setCardList] = useState<Transaction[]>([]);
  const [pointList, setPointList] = useState<Transaction[]>([]);
  const searchState = useValidateInput({
    defaultValue: "",
    validate: validateLetter
  });
  const fetchPaginatedCardTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const { data: session } = await getCardTransaction({
        cursor: "0",
        take: "50",
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
        take: "50",
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
    searchState,
    fetchPaginatedCardTransactions,
    fetchPaginatedPointTransactions
  };
};
