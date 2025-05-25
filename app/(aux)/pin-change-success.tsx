import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import {
  BottomIndicatorAvoidingView,
  TopIndicatorAvoidingView
} from "@/utils/spacing";
import { router } from "expo-router";
import { useCallback } from "react";
import { Image, View } from "react-native";

function ChangePinSuccess() {
  const handleContinue = useCallback(() => {
    router.replace({
      pathname: "/(app)/(tabs)"
    });
  }, []);

  return (
    <View className="flex-1 bg-background">
      <TopIndicatorAvoidingView />
      <View className="flex-1">
        <View className="flex-1 px-4 gap-3 items-center mt-40">
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={require("@/assets/images/success-filled.png")}
          />
          <Typography type="heading-small" weight="semibold">
            {`PIN changed`}{" "}
          </Typography>
          <Typography weight="regular" className="text-center px-6">
            {`Remember to keep your new PIN private and update it regularly.`}
          </Typography>
        </View>
        <View className="px-6 gap-6">
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            onPress={handleContinue}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {`Continue`}
            </Typography>
          </Button>
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default ChangePinSuccess;
