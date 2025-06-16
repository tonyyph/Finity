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
  const fetchPaginatedCardTransactions = useCallback(
    async ({
      types,
      searchText = "",
      take,
      cursor
    }: {
      types?: string[];
      searchText?: string;
      take?: number;
      cursor?: number;
    }) => {
      setLoading(true);
      try {
        const { data: session } = await getCardTransaction({
          cursor: cursor ?? 0,
          take: take ?? 20,
          types: types || [],
          search: searchText
        });

        setCardList(session?.data || []);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchPaginatedPointTransactions = useCallback(
    async ({
      types,
      searchText = "",
      take,
      cursor
    }: {
      types?: string[];
      searchText?: string;
      take?: number;
      cursor?: number;
    }) => {
      setLoading(true);
      try {
        const { data: session } = await getPointTransaction({
          cursor: cursor ?? 0,
          take: take ?? 20,
          types: types || [],
          search: searchText
        });

        setPointList(session?.data || []);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    },
    []
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
