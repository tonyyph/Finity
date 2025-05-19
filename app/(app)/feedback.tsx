import { Text } from "@/components/ui/text";
import { ScrollView } from "react-native";

export default function FeedbackScreen() {
  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="px-6 py-3"
      automaticallyAdjustKeyboardInsets
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <Text>{`Send feedback`}</Text>
    </ScrollView>
  );
}
