import { FilterTransactionIcon, SearchIcon } from "@/assets";
import { useListTransaction } from "@/hooks/cardholders/useListTransaction";
import { cn } from "@/lib/utils";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { BottomSheet } from "../common";
import { Typography } from "../common/text-typography";
import { PointItem } from "../transaction";
import { Header } from "../ui/header";
import { FilterCardList } from "./filter-card-list";
import { XIcon } from "lucide-react-native";

function TransactionCardTap() {
  const { cardList, fetchPaginatedCardTransactions } = useListTransaction();
  const scrollY = useRef(new Animated.Value(0)).current;
  const sheetRef = useRef<BottomSheetModal>(null);
  const [selectedFilterTypes, setSelectedFilterTypes] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [listHeight, setListHeight] = useState(1);
  const [contentHeight, setContentHeight] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(cardList);
  useEffect(() => {
    setPage(0);

    fetchPaginatedCardTransactions({
      searchText,
      types: selectedFilterTypes,
      cursor: 0,
      take: 20
    });
  }, [fetchPaginatedCardTransactions, searchText, selectedFilterTypes]);
  useEffect(() => {
    let newData = [...cardList];

    setFilteredData(newData);
  }, [searchText, cardList, selectedFilterTypes]);

  const handleLoadMore = () => {
    if (isFetchingMore) return;

    setIsFetchingMore(true);
    const nextPage = page + 1;

    fetchPaginatedCardTransactions({
      searchText,
      types: selectedFilterTypes,
      cursor: 0,
      take: 20 + nextPage * 20
    }).finally(() => {
      setPage(nextPage);
      setIsFetchingMore(false);
    });
  };

  const HeaderTab = () => (
    <View>
      <View className="flex-row items-center gap-3 px-4 py-4 bg-white">
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
          onPress={() => sheetRef?.current?.present()}
          className={cn(
            "p-[10px] rounded-full",
            selectedFilterTypes.length > 0 && "bg-[#E5E5E5]"
          )}
        >
          <FilterTransactionIcon />
          {selectedFilterTypes.length > 0 && (
            <View className="rounded-full justify-center w-[20px] h-[20px] items-center bg-[#000000] absolute left-[34px] top-[-6px]">
              <Typography
                type="body-extraSmall"
                weight="medium"
                textColor="white"
              >
                {selectedFilterTypes.length}
              </Typography>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {selectedFilterTypes.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            setSelectedFilterTypes([]);
          }}
          className="px-4 py-3 bg-[#525252] self-start items-center mx-4 mb-2 rounded-full flex-row gap-[2px]"
        >
          <Typography type="body-small" weight="regular" textColor="white">
            Clear filter
          </Typography>
          <XIcon color={"white"} size={16} />
        </TouchableOpacity>
      )}
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
      {HeaderTab()}

      <Animated.FlatList
        data={filteredData}
        renderItem={({ item, index }) => <PointItem item={item} />}
        contentContainerStyle={{
          paddingTop: 12,
          paddingRight: 10
        }}
        showsVerticalScrollIndicator={false}
        onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
        onContentSizeChange={(_, h) => setContentHeight(h)}
        scrollEventThrottle={16}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Load more when 50% from bottom
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
      <BottomSheet ref={sheetRef} index={0} snapPoints={["50%"]}>
        <BottomSheetView className="min-h-[100%] mt-1">
          <Header
            title="Filter transactions"
            spacing={false}
            onRightFunction={() => {
              sheetRef.current?.close();
            }}
          />
          <FilterCardList
            onChange={(selected) => setSelectedFilterTypes(selected)}
            selectedFilterTypes={selectedFilterTypes}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

export default TransactionCardTap;
