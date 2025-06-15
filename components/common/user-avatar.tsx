import { View } from "react-native";
import { Typography } from "./text-typography";

type UserAvatarProps = {
  user?: {
    id: string;
    fullName?: string | null;
    imageUrl?: string;
  } | null;
  className?: string;
  fallbackClassName?: string;
  fullName?: string;
  fallbackLabelClassName?: string;
};

export function UserAvatar({ user, fullName }: UserAvatarProps) {
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    return parts.map((part) => part[0].toUpperCase()).join("");
  };
  const shortName = getInitials(fullName || user?.fullName || "N/A");

  return (
    <View className="h-[56px] w-[56px] bg-[#A3A3A3] rounded-full items-center justify-center">
      <Typography type="heading-extraSmall" textColor="white">
        {shortName}
      </Typography>
    </View>
  );
}
