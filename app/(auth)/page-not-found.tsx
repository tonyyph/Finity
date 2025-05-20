import { CircleAlertX } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Linking, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PageNotFound() {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

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
          Page not found
        </Typography>
        <Typography weight="regular" className="text-center mt-4">
          We can’t seem to find the page you’re looking for.
        </Typography>
        <Typography weight="regular" className="text-center mt-4 mx-4">
          Try going back to the previous page or contact us at{" "}
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
          Return to home
        </Typography>
      </Button>
      <View style={{ height: bottom }} />
    </View>
  );
}
