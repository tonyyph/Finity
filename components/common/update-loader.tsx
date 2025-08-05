import { View } from "react-native";
import UpdateIllustration from "../svg-assets/update-illustration";
import { Text } from "../ui/text";

export function UpdateLoader() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background">
      <UpdateIllustration className="h-72 text-primary mb-8" />
      <Text className="text-muted-foreground text-center">{`Finity Rewards is updating, please wait...`}</Text>
      <Text className="text-muted-foreground mx-4 text-center">{`NOTE: this mechanism is intended for checking in the development environment, as we are using OTA (over-the-air) updates. If there are any UI bugs, I can make the necessary adjustments immediately without requiring a new app build.`}</Text>
      <Text className="text-muted-foreground mx-4 text-center">{`This screen is temporary and will be removed after UAT testing is completed.`}</Text>
    </View>
  );
}
