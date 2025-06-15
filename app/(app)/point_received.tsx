import { Typography } from "@/components/common/text-typography";
import { Header } from "@/components/ui/header";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

function PointReceivedScreen() {
  const { item } = useLocalSearchParams();
  const data = JSON.parse(item as string);

  return (
    <View className="flex-1 bg-white">
      <Header onRightFunction={router.back} title="" />
      <View className="flex-1 bg-white mx-4 mt-4">
        <Typography type="heading-small" weight="semibold" className="mx-2">
          Transaction details
        </Typography>
        <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
          <Typography weight="regular" textColor="#404040">
            {`Points received`}
          </Typography>
          <Typography>{data?.points + " points"}</Typography>
          <View className=" h-[1px] bg-[#E5E5E5] my-4" />
          <Typography weight="semibold" className="mb-2">
            Sender details
          </Typography>
          <Typography weight="regular" textColor="#404040">
            Account holder
          </Typography>
          <Typography>{data?.emailAddress}</Typography>
          <View className=" h-[1px] bg-[#E5E5E5] my-4" />
          <Typography weight="regular" textColor="#404040">
            Reference number
          </Typography>
          <Typography className="mb-2">{data?.phoneNumber}</Typography>
          <Typography weight="regular" textColor="#404040">
            Date and time
          </Typography>
          <Typography>{data?.date}</Typography>
        </View>
      </View>
    </View>
  );
}
export default PointReceivedScreen;
