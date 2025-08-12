import { ArrowBackIcon } from "./icons";
import { useRouter } from "expo-router";
import { Button } from "../ui";

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
