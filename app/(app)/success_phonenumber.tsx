import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { useCallback } from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function SuccessPhoneNumberScreen() {
  const { top, bottom } = useSafeAreaInsets();

  const handleContinue = useCallback(() => {
    router.dismissAll();
  }, []);

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="flex-1">
        <View className="flex-1 px-4 gap-3 items-center mt-40">
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={require("@/assets/images/success-filled.png")}
          />
          <Typography type="heading-small" weight="semibold">
            Mobile number changed
          </Typography>
          <Typography weight="regular" className="text-center mx-4">
            Your mobile number has been updated successfully.
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
    </View>
  );
}
export default SuccessPhoneNumberScreen;
