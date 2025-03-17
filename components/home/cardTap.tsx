import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import { View } from "react-native";
import Typography from "../common/text-typography";

const DATA = null;

function CardTab() {
  useEffect(() => {}, []);
  return (
    <View className="flex-1 bg-white ">
      <FlashList
        data={DATA}
        renderItem={({ item }) => {
          return (
            <Typography
              weight="regular"
              type="body-default"
              textColor="#737373"
            >
              {"TEST"}
            </Typography>
          );
        }}
        estimatedItemSize={50}
        ListEmptyComponent={() => {
          return (
            <View className="pt-4 justify-center items-center">
              <Typography
                weight="regular"
                type="body-default"
                textColor="#737373"
              >
                No transactions yet.
              </Typography>
            </View>
          );
        }}
      />
    </View>
  );
}
export default CardTab;
