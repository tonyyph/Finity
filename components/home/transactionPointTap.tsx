import { CardLoadIcon } from "@/assets/icons/CardLoadIcon";
import { FinityIcon } from "@/assets/icons/FinityIcon";
import { useListTransaction } from "@/hooks/cardholders/useListTransaction";
import { formatDateTransaction } from "@/lib/date";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import Typography from "../common/text-typography";
import { Button } from "../ui/button";
import DATA from "./mockup.json";

function TransactionPointTap({ showAll = false }: { showAll?: boolean }) {
  const { cardList, fetchPaginatedCardTransactions } = useListTransaction();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [listHeight, setListHeight] = useState(1);
  const [contentHeight, setContentHeight] = useState(1);

  useEffect(() => {
    fetchPaginatedCardTransactions();
  }, [fetchPaginatedCardTransactions]);

  const handleSeeMore = () => {
    router.push("/transactions");
  };

  const EmptyList = () => (
    <View className="pt-4 justify-center items-center">
      <Typography weight="regular" type="body-default" textColor="#737373">
        No transactions yet.
      </Typography>
    </View>
  );

  const Footer = () =>
    showAll ? (
      <BottomIndicatorAvoidingView />
    ) : (
      <Button
        variant="outline"
        size="lg"
        className="rounded-full h-[48px] mt-4"
        onPress={handleSeeMore}
      >
        <Typography type="body-default" weight="medium" textColor="black">
          See more
        </Typography>
      </Button>
    );

  const indicatorHeight = 100;
  const maxScroll = contentHeight - listHeight;
  const indicatorTranslateY = scrollY.interpolate({
    inputRange: [0, maxScroll > 0 ? maxScroll : 1],
    outputRange: [0, listHeight - indicatorHeight],
    extrapolate: "clamp"
  });

  return (
    <View className="flex-1 relative">
      <Animated.FlatList
        data={showAll ? DATA : DATA.slice(0, 10)}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-start my-2 mx-4">
            <View className="flex flex-row items-start gap-4 min-h-[64px]">
              <View className="w-[40px] h-[40px] bg-[#F4F4F4] rounded-full justify-center items-center">
                {item?.type === "Card Load" ? <CardLoadIcon /> : <FinityIcon />}
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
        )}
        contentContainerStyle={{
          paddingTop: 12,
          paddingRight: showAll ? 10 : 0
        }}
        showsVerticalScrollIndicator={false}
        onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
        onContentSizeChange={(_, h) => setContentHeight(h)}
        scrollEventThrottle={16}
        onScroll={
          showAll
            ? Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )
            : undefined
        }
        ListFooterComponent={Footer}
        ListEmptyComponent={EmptyList}
      />

      {/* Custom Scroll Indicator */}
      {showAll && (
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 10,
            right: 4,
            top: 4,
            width: 8,
            borderRadius: 8,
            backgroundColor: "#D4D4D4",
            height: indicatorHeight,
            transform: [{ translateY: indicatorTranslateY }]
          }}
        />
      )}
    </View>
  );
}

export default TransactionPointTap;
