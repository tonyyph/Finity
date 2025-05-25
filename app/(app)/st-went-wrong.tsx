import { CircleAlertX } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import {
  BottomIndicatorAvoidingView,
  TopIndicatorAvoidingView
} from "@/utils/spacing";
import { router } from "expo-router";
import { View } from "react-native";

export default function SomethingWentWrong() {
  return (
    <View className="flex-1 bg-background px-4">
      <TopIndicatorAvoidingView />
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
          router.back();
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
