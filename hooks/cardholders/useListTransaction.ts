import { getCardTransaction, getPointTransaction } from "@/api";
import { validateLetter } from "@/utils";
import { useCallback, useState } from "react";
import { useValidateInput } from "../commons";

type FetchParams = {
  types?: string[];
  searchText?: string;
  take?: number;
  cursor?: number;
};

export const useListTransaction = () => {
  const [loading, setLoading] = useState(true);
  const [cardList, setCardList] = useState<Transaction[]>([]);
  const [pointList, setPointList] = useState<Transaction[]>([]);

  const searchState = useValidateInput({
    defaultValue: "",
    validate: validateLetter
  });

  const fetchTransactions = useCallback(
    async (
      fetcher: typeof getCardTransaction | typeof getPointTransaction,
      setter: React.Dispatch<React.SetStateAction<Transaction[]>>,
      { types = [], searchText = "", take = 20, cursor = 0 }: FetchParams
    ) => {
      setLoading(true);
      try {
        const { data: session } = await fetcher({
          cursor,
          take,
          types,
          search: searchText
        });

        setter(session?.data || []);
      } catch (error) {
        console.log("Fetch transaction error", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchPaginatedCardTransactions = useCallback(
    (params: FetchParams) =>
      fetchTransactions(getCardTransaction, setCardList, params),
    [fetchTransactions]
  );

  const fetchPaginatedPointTransactions = useCallback(
    (params: FetchParams) =>
      fetchTransactions(getPointTransaction, setPointList, params),
    [fetchTransactions]
  );

  return {
    loading,
    cardList,
    pointList,
    searchState,
    fetchPaginatedCardTransactions,
    fetchPaginatedPointTransactions
  };
};
