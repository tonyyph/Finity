import { View } from "react-native";
import { Skeleton } from "../ui/skeleton";

export function PDFSkeleton() {
  return (
    <View className="flex-1 mx-4">
      <Skeleton className="h-full w-full my-16 " />
    </View>
  );
}
