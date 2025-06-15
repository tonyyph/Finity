import { CardLoadIcon } from "@/assets/icons/CardLoadIcon";
import { FinityIcon } from "@/assets/icons/FinityIcon";
import { useListTransaction } from "@/hooks/cardholders/useListTransaction";
import { formatDateTransaction } from "@/lib/date";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Typography } from "../common/text-typography";
import { Button } from "../ui/button";
function CardTab({ showAll = false }: { showAll?: boolean }) {
  const { cardList, fetchPaginatedCardTransactions } = useListTransaction();

  useEffect(() => {
    fetchPaginatedCardTransactions();
  }, [fetchPaginatedCardTransactions]);

  const handleSeeMore = () => {
    router.push({
      pathname: "/transactions",
      params: { initTab: "0" }
    });
  };

  const EmptyList = () => {
    return (
      <View className="pt-4 justify-center items-center gap-2">
        <Typography weight="regular" type="body-default" textColor="#737373">
          No transactions yet.
        </Typography>
      </View>
    );
  };

  const Footer = () => {
    if (showAll) return <BottomIndicatorAvoidingView />;
    if (cardList.length < 10) return null;
    return (
      <Button
        variant="outline"
        size={"lg"}
        className="rounded-full h-[48px] mt-4"
        onPress={handleSeeMore}
      >
        <Typography type="body-default" weight="medium" textColor="black">
          {`See more`}
        </Typography>
      </Button>
    );
  };
  return (
    <View className="flex-1">
      <FlashList
        data={cardList}
        contentContainerClassName="pt-3"
        showsVerticalScrollIndicator={showAll}
        renderItem={({ item, index }) => {
          return (
            <View className="flex-row justify-between items-start my-2">
              <View className="flex flex-row items-start gap-4 min-h-[64px]">
                <View className="w-[40px] h-[40px] bg-[#F4F4F4] rounded-full justify-center items-center">
                  {item?.type === "Card Load" ? (
                    <CardLoadIcon />
                  ) : (
                    <FinityIcon />
                  )}
                </View>
                <View>
                  <Typography>{item.type}</Typography>
                  <Typography textColor="#404040" weight="regular">
                    {!!item?.source
                      ? item?.source
                      : `£ ${Math.abs(item?.amount).toFixed(2)}`}
                  </Typography>
                  <Typography textColor="#737373" weight="regular">
                    {formatDateTransaction(item?.date)}
                  </Typography>
                </View>
              </View>
              <Typography
                textColor={item.amount > 0 ? "#00A464" : "#D9323D"}
                className="text-right"
              >
                {`${item?.amount > 0 ? "+" : "-"}${Math.abs(
                  item?.amount
                ).toLocaleString()}`}
              </Typography>
            </View>
          );
        }}
        nestedScrollEnabled={true}
        scrollEnabled={showAll}
        ListFooterComponent={Footer}
        estimatedItemSize={64}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
}
export default CardTab;
