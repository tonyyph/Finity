import { CircleAlertX, Typography, Button } from "@/components";
import { useNetwork } from "@/stores";
import { BottomIndicatorAvoidingView, TopIndicatorAvoidingView } from "@/utils";
import { router } from "expo-router";
import { View } from "react-native";

export default function OfflineScreen() {
  const { isConnected } = useNetwork();

  return (
    <View className="flex-1 bg-background px-4">
      <TopIndicatorAvoidingView number={1.5} />
      <View className=" flex-1 bg-background items-center">
        <CircleAlertX />
        <Typography type="heading-small" weight="semibold" className="mt-4">
          Something went wrong
        </Typography>
        <Typography weight="regular" className="text-center mt-4">
          An unexpected error occurred while processing your request. Please try
          again.
        </Typography>
      </View>

      <Button
        variant="default"
        size={"lg"}
        className="rounded-full bg-primary h-[48px]"
        onPress={() => {
          isConnected && router.navigate("/(app)/(tabs)");
        }}
      >
        <Typography type="body-default" weight="medium" textColor="white">
          Try again
        </Typography>
      </Button>
      <BottomIndicatorAvoidingView />
    </View>
  );
}
