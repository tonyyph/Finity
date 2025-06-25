import { LogoMark } from "@/assets";
import { Typography } from "@/components/common/text-typography";
import { Header } from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import {
  NotificationItem,
  useNotification
} from "@/hooks/notifications/useNotification";
import { cn } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

function NotificationScreen() {
  const { notifications } = useNotification();

  const onPressNotification = (item: NotificationItem) => {
    router.push({
      pathname: "/point-received",
      params: {
        item: JSON.stringify(item)
      }
    });
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      onPress={() => {
        onPressNotification(item);
      }}
      activeOpacity={0.2}
      className={cn(
        "flex-row items-start p-2 mt-2 rounded-lg",
        !item.read && "bg-white"
      )}
    >
      <View className="mx-1">
        <View
          className={cn(
            "w-3 h-3 bg-border2 rounded-full mt-[6px] mr-2",
            !item.read && "bg-[#FF885D]"
          )}
        />
      </View>
      <View className="flex-1 gap-1">
        <View className="flex flex-row items-center justify-between">
          <Typography
            weight="semibold"
            type="body-default"
            textColor={!item?.read ? "#0A0A0A" : "#737373"}
          >
            Points received
          </Typography>
          <Typography weight="regular" type="body-small" textColor="#737373">
            {item.date}
          </Typography>
        </View>
        <Typography
          weight="regular"
          type="body-small"
          textColor={!item?.read ? "#404040" : "#737373"}
        >
          Hello! You have received {item.points.toLocaleString()} points from{" "}
          {item.sender}.
        </Typography>
      </View>
    </TouchableOpacity>
  );

  const EmptyList = () => {
    return (
      <View className="pt-[50%] justify-center items-center">
        <Image source={LogoMark} className="w-[100px] h-[100px]" />
        <Typography weight="regular" type="body-default" textColor="#737373">
          No notifications yet.
        </Typography>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Header onBack={router.back} title="Notifications" />
      <ProgressBar completeAnimation />
      <FlashList
        data={notifications}
        className="mx-4"
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        keyExtractor={(item) => item.id}
        estimatedItemSize={80}
      />
    </View>
  );
}
export default NotificationScreen;
