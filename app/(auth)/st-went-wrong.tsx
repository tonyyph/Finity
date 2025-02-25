import { CircleAlertX } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Linking, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SomethingWentWrong() {
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
          Something went wrong
        </Text>
        <Text className="text-neutral-950 text-center mt-4 text-base font-normal font-['PP Neue Montreal'] leading-snug tracking-wide">
          An unexpected error occurred while processing your request. Please try
          again.
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
        <Text className="text-white text-base font-medium">{`Try again`}</Text>
      </Button>
      <View style={{ height: bottom }} />
    </View>
  );
}
