import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { useCallback } from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function PINChangeSuccess() {
  const { top, bottom } = useSafeAreaInsets();

  const handleContinue = useCallback(() => {
    router.dismissAll();
  }, []);

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingBottom: bottom, paddingTop: top * 1.5 }}
    >
      <View className="flex-1">
        <View className="flex-1 px-4 gap-4 items-center mt-40">
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={require("@/assets/images/success-filled.png")}
          />
          <Typography type="heading-small" weight="semibold">
            {`PIN created successfully!`}
          </Typography>
          <Typography weight="regular" className="text-center px-4">
            {`Your account is now even more secure. \nRemember to keep your new PIN private and update it regularly.`}
          </Typography>
        </View>
        <View className="px-4 gap-4">
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
export default PINChangeSuccess;
