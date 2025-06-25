import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { View } from "react-native";
import { Typography } from "../common/text-typography";
import { PointItem } from "../transaction";
import { Button } from "../ui/button";

export function PointsTap({
  showAll = false,
  pointList
}: {
  showAll?: boolean;
  pointList: Transaction[];
}) {
  const handleSeeMore = () => {
    router.push({
      pathname: "/transactions",
      params: { initTab: "1" }
    });
  };

  const EmptyList = () => {
    return (
      <View className="pt-4 justify-center items-center">
        <Typography weight="regular" type="body-default" textColor="#737373">
          No transactions yet.
        </Typography>
      </View>
    );
  };

  const Footer = () => {
    if (showAll) return <BottomIndicatorAvoidingView />;
    if (pointList.length < 10) return null;
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
        data={showAll ? pointList : pointList.slice(0, 10)}
        contentContainerClassName="pt-3"
        showsVerticalScrollIndicator={false}
        estimatedItemSize={96}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        className="flex-1"
        onEndReachedThreshold={0.1}
        renderItem={({ item, index }) => <PointItem item={item} />}
        nestedScrollEnabled={true}
        scrollEnabled={showAll}
        ListFooterComponent={Footer}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
}
export default PointsTap;
