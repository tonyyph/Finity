import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { View } from "react-native";
import { Typography } from "../common/text-typography";
import { Button } from "../ui/button";
import { CardItem } from "../transaction";
export function CardTab({
  showAll = false,
  cardList
}: {
  showAll?: boolean;
  cardList: Transaction[];
}) {
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
        data={showAll ? cardList : cardList.slice(0, 10)}
        contentContainerClassName="pt-3"
        showsVerticalScrollIndicator={false}
        estimatedItemSize={96}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        className="flex-1"
        onEndReachedThreshold={0.1}
        renderItem={({ item, index }) => <CardItem item={item} />}
        nestedScrollEnabled={true}
        scrollEnabled={showAll}
        ListFooterComponent={Footer}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
}
export default CardTab;
