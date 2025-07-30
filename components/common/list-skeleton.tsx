import { View } from "react-native";
import { Skeleton } from "../ui/skeleton";
import React from "react";

export function ListSkeleton() {
  return (
    <View className="mt-2">
      {React.Children.toArray(
        [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Skeleton className="h-[78px] w-[95%] my-2" />
        ))
      )}
    </View>
  );
}
