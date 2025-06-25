import { View } from "react-native";
import { Skeleton } from "../ui/skeleton";

export function TransHisSkeleton() {
  return (
    <View className="flex-1">
      <Skeleton className="bg-[#F5F5F5] h-[300px] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6" />
    </View>
  );
}
