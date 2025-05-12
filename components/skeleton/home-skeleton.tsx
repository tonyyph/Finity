import React from "react";
import { View } from "react-native";
import { Skeleton } from "../ui/skeleton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function HomeSkeleton() {
  const { top } = useSafeAreaInsets();

  return (
    <View className="flex-1 mx-4" style={{ paddingTop: top }}>
      <Skeleton className="my-5 h-6 w-20 rounded-full" />

      <View className="bg-neutral-300 rounded-2xl p-4 my-4">
        <Skeleton className="h-[230px] w-full rounded-xl" />
      </View>
      {React.Children.toArray(
        [1, 2, 3].map((i) => (
          <View className="flex-row gap-2">
            <Skeleton className="mt-3 mb-5 w-10 h-10 rounded-full" />
            <Skeleton className="mt-3 mb-5 h-10 w-[90%] rounded-xl" />
          </View>
        ))
      )}
    </View>
  );
}
