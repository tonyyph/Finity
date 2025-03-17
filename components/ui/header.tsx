import React, { useState, useEffect, ReactNode } from "react";
import { SafeAreaView, View } from "react-native";
import { Button } from "./button";
import { ArrowLeftIcon, XIcon } from "lucide-react-native";
import { router } from "expo-router";
import { Text } from "./text";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  onLeftFunction?: (parmams?: any) => void;
  renderLeftView?: ReactNode;
  renderCenterView?: ReactNode;
  onBack?: (params?: any) => void;
  onRightFuntion?: (pramams?: any) => void;
  childrent?: ReactNode;
  renderRightView?: ReactNode;
  className?: string;
};

function Header({
  title,
  onBack,
  onLeftFunction,
  onRightFuntion,
  renderLeftView,
  renderCenterView,
  renderRightView,
  className,
}: Props) {
  return (
    <View className={cn("pb-[16px] border-b-[1px] border-border", className)}>
      <SafeAreaView className="">
        <View className="flex-row justify-between">
          {renderLeftView ??
            (!!onBack || !!onLeftFunction ? (
              <Button
                className="flex-shrink"
                onPress={(value) => {
                  onBack?.(value);
                  onLeftFunction?.(value);
                }}
                size="icon"
                variant="ghost"
              >
                <ArrowLeftIcon className="h-8 w-8 left-2 text-foreground" />
              </Button>
            ) : (
              <View className="flex-shrink">
                <ArrowLeftIcon className="h-8 w-8 left-2  color-transparent" />
              </View>
            ))}
          {renderCenterView ?? (
            <View className="flex-shrink justify-center items-cente">
              <Text className="text-center text-[18px] font-bold">{title}</Text>
            </View>
          )}
          {renderRightView ??
            (!!onRightFuntion ? (
              <Button
                className="flex-shrink "
                size="icon"
                variant="ghost"
                onPress={onRightFuntion}
              >
                <XIcon className="h-8 w-8 right-2 text-foreground" />
              </Button>
            ) : (
              <View className="flex-shrink ">
                <XIcon className="h-8 w-8 right-2  color-transparent" />
              </View>
            ))}
        </View>
      </SafeAreaView>
    </View>
  );
}
export default Header;
