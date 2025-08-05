import { useListTransaction } from "@/hooks";
import { cn } from "@/lib";
import { BottomIndicatorAvoidingView } from "@/utils";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { XIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  BottomSheet,
  FilterTransactionIcon,
  SearchIcon,
  Typography
} from "../common";
import { PointItem } from "../transaction";
import { Button } from "../ui";
import { FilterPointList } from "./filter-point-list";

export function TransactionPointTap() {
  const { pointList, fetchPaginatedPointTransactions } = useListTransaction();

  const scrollY = useRef(new Animated.Value(0)).current;
  const sheetRef = useRef<BottomSheetModal>(null);
  const [selectedFilterTypes, setSelectedFilterTypes] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [listHeight, setListHeight] = useState(1);
  const [contentHeight, setContentHeight] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(pointList);
  useEffect(() => {
    setPage(0);

    fetchPaginatedPointTransactions({
      searchText,
      types: selectedFilterTypes,
      cursor: 0,
      take: 20
    });
  }, [fetchPaginatedPointTransactions, searchText, selectedFilterTypes]);
  useEffect(() => {
    let newData = [...pointList];

    setFilteredData(newData);
  }, [searchText, pointList, selectedFilterTypes]);

  const handleLoadMore = () => {
    if (isFetchingMore) return;

    setIsFetchingMore(true);
    const nextPage = page + 1;

    fetchPaginatedPointTransactions({
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
      <View className="flex-row items-center gap-3 pt-6 pb-2 bg-white">
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
          onPress={() => {
            sheetRef?.current?.present();
            Keyboard.dismiss();
          }}
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
          className="px-4 py-3 bg-[#525252] self-start items-center mb-4 mt-2 rounded-full flex-row gap-[2px]"
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
      <Typography
        weight="regular"
        type="body-default"
        textColor="#737373"
        className="text-center"
      >
        {selectedFilterTypes.length > 0
          ? `No results found.
Try changing your filter.`
          : `No transactions yet.`}
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
    <View className="flex-1 relative px-4">
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
            top: 88,
            width: 8,
            borderRadius: 8,
            backgroundColor: "#D4D4D4",
            height: indicatorHeight,
            transform: [{ translateY: indicatorTranslateY }]
          }}
        />
      )}
      <BottomSheet ref={sheetRef} index={0} snapPoints={["50%"]}>
        <BottomSheetView className="min-h-[100%]">
          <View className="flex-row justify-between gap-3 p-3 items-center">
            <View className="h-[24px] w-[24px]" />
            <Typography type="body-large" weight="semibold">
              {`Filter transactions`}
            </Typography>
            <Button
              className="flex-shrink items-center"
              size="icon"
              variant="ghost"
              onPress={() => sheetRef.current?.close()}
            >
              <XIcon className="h-[24px] w-[24px] text-black" />
            </Button>
          </View>
          <FilterPointList
            onChange={(selected) => setSelectedFilterTypes(selected)}
            selectedFilterTypes={selectedFilterTypes}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

export default TransactionPointTap;
