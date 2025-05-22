import { View } from "react-native";
import UpdateIllustration from "../svg-assets/update-illustration";
import { Text } from "../ui/text";

export function UpdateLoader() {
  return (
    <View className="flex-1 items-center justify-center gap-12 bg-background">
      <UpdateIllustration className="h-72 text-primary" />
      <Text className="text-muted-foreground">{`Finity Rewards is updating, please wait...`}</Text>
    </View>
  );
}
