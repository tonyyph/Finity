import { CircleAlertX } from "@/components/common/icons";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Linking, View } from "react-native";

export default function AccessDenied() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <View />
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-background px-4">
      <View className=" flex-1 bg-background items-center">
        <CircleAlertX />
        <Typography type="heading-small" weight="semibold" className="mt-4">
          Access Denied
        </Typography>
        <Typography weight="regular" className="text-center mt-4">
          Your account has been deactivated by the administrator.
        </Typography>
        <Typography weight="regular" className="text-center mt-4">
          Need help? Contact us at{" "}
          <Typography
            weight="regular"
            className="text-center mt-4 underline"
            onPress={() => Linking.openURL("https://support.finity.co.uk")}
          >
            support.finity.co.uk
          </Typography>
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
          Close
        </Typography>
      </Button>
      <BottomIndicatorAvoidingView />
    </View>
  );
}
