import { CircleAlertX } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Linking, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PageNotFound() {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <View />
    });
  }, []);
  return (
    <View className="flex-1 bg-background px-4">
      <View className=" flex-1 bg-background items-center">
        <CircleAlertX className="" />
        <Text className="text-2xl font-semibold text-neutral-950 font-['PP Neue Montreal'] leading-[30px] tracking-wide">
          Page not found
        </Text>
        <Text className="text-neutral-950 text-center mt-4 text-base font-normal font-['PP Neue Montreal'] leading-snug tracking-wide">
          We can’t seem to find the page you’re looking for.
        </Text>
        <Text className="text-neutral-950 text-center mt-4 text-base font-normal font-['PP Neue Montreal'] leading-snug tracking-wide">
          Try going back to the previous page or contact us at{" "}
          <Text
            onPress={() => Linking.openURL("https://support.finity.co.uk")}
            className="text-neutral-950 text-center mt-4 text-base font-normal font-['PP Neue Montreal'] leading-snug tracking-wide underline"
          >
            support.finity.co.uk
          </Text>
        </Text>
      </View>

      <Button
        variant="default"
        size={"lg"}
        className="rounded-full bg-primary h-[48px]"
        onPress={() => {
          router.back();
        }}
      >
        <Text className="text-white text-base font-medium">{`Return to home`}</Text>
      </Button>
      <View style={{ height: bottom }} />
    </View>
  );
}
