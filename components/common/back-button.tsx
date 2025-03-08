import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { Button } from "../ui/button";

export function BackButton() {
  const router = useRouter();
  if (!router.canGoBack) {
    return null;
  }
  return (
    <Button
      size="icon"
      variant="ghost"
      onPress={router.back}
      // className="right-4"
    >
      <ArrowLeftIcon className="h-8 w-8 text-foreground" />
    </Button>
  );
}
