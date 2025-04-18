import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { Button } from "../ui/button";
import { ArrowBackIcon } from "@/assets";

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
      className="right-3"
    >
      <ArrowBackIcon />
    </Button>
  );
}
