import Typography from "@/components/common/text-typography";
import Header from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

type NotificationItem = {
  id: string;
  date: string;
  points: number;
  sender: string;
  read: boolean;
  emailAddress: string;
  phoneNumber: string;
};

const mockData: NotificationItem[] = [
  {
    id: "1",
    date: "Jan 30, 2025",
    points: 120,
    sender: "Katelyn Jocson",
    emailAddress: "katelyn.jocson@business.co.uk",
    phoneNumber: "0123456789",
    read: false
  },
  {
    id: "2",
    date: "Jan 15, 2025",
    points: 150,
    sender: "Katelyn Jocson",
    emailAddress: "katelyn.jocson@business.co.uk",
    phoneNumber: "0123456788",
    read: false
  },
  {
    id: "3",
    date: "Dec 23, 2025",
    points: 110,
    sender: "Katelyn Jocson",
    emailAddress: "katelyn.jocson@business.co.uk",
    phoneNumber: "0123456787",
    read: false
  },
  {
    id: "4",
    date: "Nov 01, 2024",
    points: 1000,
    sender: "Katelyn Jocson",
    emailAddress: "katelyn.jocson@business.co.uk",
    phoneNumber: "0123456786",
    read: true
  },
  {
    id: "5",
    date: "Oct 16, 2024",
    points: 50,
    sender: "Lauren Uy",
    emailAddress: "lauren.uy@business.co.uk",
    phoneNumber: "0123456785",
    read: true
  }
];

function NotificationScreen() {
  const onPressNotification = (item: NotificationItem) => {
    router.push({
      pathname: "/point_received",
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

  return (
    <View className="flex-1 bg-white">
      <Header onBack={router.back} title="Notifications" />
      <ProgressBar />
      <FlashList
        data={mockData}
        className="bg-white mx-4"
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={80}
      />
    </View>
  );
}
export default NotificationScreen;
