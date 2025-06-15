import { CardLoadIcon } from "@/assets/icons/CardLoadIcon";
import { FinityIcon } from "@/assets/icons/FinityIcon";
import { useListTransaction } from "@/hooks/cardholders/useListTransaction";
import { formatDateTransaction } from "@/lib/date";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Typography } from "../common/text-typography";
import { FilterTransactionIcon, SearchIcon } from "@/assets";
import { cn } from "@/lib/utils";

function TransactionPointTap() {
  const { pointList, fetchPaginatedPointTransactions } = useListTransaction();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [listHeight, setListHeight] = useState(1);
  const [contentHeight, setContentHeight] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [filterCardLoadOnly, setFilterCardLoadOnly] = useState(false);
  const [filteredData, setFilteredData] = useState(pointList);
  useEffect(() => {
    fetchPaginatedPointTransactions();
  }, [fetchPaginatedPointTransactions]);

  useEffect(() => {
    let newData = [...pointList];
    if (filterCardLoadOnly) {
      newData = newData.filter((item) => item.type === "Card Load");
    }
    if (searchText.trim()) {
      const keyword = searchText.toLowerCase();
      newData = newData.filter(
        (item) =>
          item.type.toLowerCase().includes(keyword) ||
          item.source?.toLowerCase().includes(keyword)
      );
    }
    setFilteredData(newData);
  }, [searchText, filterCardLoadOnly, pointList]);

  const Header = () => (
    <View className="flex-row items-center gap-2 px-4 py-4 bg-white">
      <View className="border flex-1 border-border rounded-lg relative">
        <TextInput
          className="flex-1 h-[48px] px-4 rounded-lg bg-subtle border border-border pl-10 pr-4"
          placeholder="Search transaction"
          placeholderTextColor="#737373"
          autoCorrect={false}
          autoCapitalize="none"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={Keyboard.dismiss}
          returnKeyType="search"
        />
        <View className="absolute top-3.5 left-2">
          <SearchIcon />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setFilterCardLoadOnly((prev) => !prev)}
        className={cn(
          "p-[10px] rounded-full ",
          filterCardLoadOnly && "bg-[#E5E5E5]"
        )}
      >
        <FilterTransactionIcon />
      </TouchableOpacity>
    </View>
  );

  const EmptyList = () => (
    <View className="pt-4 justify-center items-center">
      <Typography weight="regular" type="body-default" textColor="#737373">
        No transactions yet.
      </Typography>
    </View>
  );

  const Footer = () => {
    return <BottomIndicatorAvoidingView number={4} />;
  };

  const indicatorHeight = 100;
  const maxScroll = contentHeight - listHeight;
  const indicatorTranslateY = scrollY.interpolate({
    inputRange: [0, maxScroll > 0 ? maxScroll : 1],
    outputRange: [0, listHeight - indicatorHeight],
    extrapolate: "clamp"
  });

  return (
    <View className="flex-1 relative">
      {Header()}

      <Animated.FlatList
        data={filteredData}
        renderItem={({ item, index }) => {
          return (
            <View className="flex-1 flex-row justify-between items-start my-2 mx-4">
              <View className="flex-1 flex-row items-start gap-4 min-h-[64px]">
                <View className="w-[40px] h-[40px] bg-[#F4F4F4] rounded-full justify-center items-center">
                  {item?.type === "Card Load" ? (
                    <CardLoadIcon />
                  ) : (
                    <FinityIcon />
                  )}
                </View>
                <View>
                  <Typography>{item.type}</Typography>
                  <Typography
                    textColor="#404040"
                    weight="regular"
                    style={{
                      maxWidth: 300
                    }}
                  >
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
                className="text-right flex-[0.2]"
              >
                {`${item?.amount > 0 ? "+" : "-"}${Math.abs(
                  item?.amount
                ).toLocaleString()}`}
              </Typography>
            </View>
          );
        }}
        contentContainerStyle={{
          paddingTop: 12,
          paddingRight: 10
        }}
        showsVerticalScrollIndicator={false}
        onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
        onContentSizeChange={(_, h) => setContentHeight(h)}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        ListFooterComponent={Footer}
        ListEmptyComponent={EmptyList}
      />

      {/* Custom Scroll Indicator */}

      {contentHeight > 960 && (
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
