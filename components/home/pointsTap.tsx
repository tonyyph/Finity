import { FlashList } from "@shopify/flash-list";
import { EuroIcon } from "lucide-react-native";
import { View } from "react-native";
import Typography from "../common/text-typography";
type Props = object;

const DATA = [
  {
    id: 0,
    title: "Card load",
    points: 100,
    timestamp: "Oct 4, 2024"
  },
  {
    id: 1,
    title: "Second Item",
    points: 200,
    timestamp: "Oct 4, 2024"
  },
  {
    id: 2,
    title: "Card load",
    points: 400,
    timestamp: "Oct 4, 2024"
  },
  {
    id: 3,
    title: "Second Item",
    points: 300,
    timestamp: "Oct 4, 2024"
  }
];

function PointsTap(props: Props) {
  return (
    <View className="flex-1 bg-white">
      <FlashList
        data={DATA}
        contentContainerClassName="pt-3"
        renderItem={({ item, index }) => {
          return (
            <View className="flex-row justify-between items-start my-2">
              <View className="flex flex-row items-start gap-4">
                <View className="w-[40px] h-[40px] bg-[#F4F4F4] rounded-full justify-center items-center">
                  <EuroIcon className="size-5" />
                </View>
                <View>
                  <Typography>{item.title}</Typography>
                  <Typography textColor="#404040" weight="regular">
                    {item.points}
                  </Typography>
                  <Typography textColor="#737373" weight="regular">
                    {item.timestamp}
                  </Typography>
                </View>
              </View>
              <Typography textColor="#D9323D" className="text-right">
                {`-2,000`}
              </Typography>
            </View>
          );
        }}
        estimatedItemSize={50}
      />
    </View>
  );
}
export default PointsTap;
