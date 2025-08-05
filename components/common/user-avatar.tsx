import { View } from "react-native";
import { TextType, Typography } from "./text-typography";
import { cn } from "@/lib";

type UserAvatarProps = {
  user?: {
    id: string;
    fullName?: string | null;
    imageUrl?: string;
  } | null;
  className?: string;
  textType: TextType;
  fullName?: string;
  fallbackLabelClassName?: string;
};

export function UserAvatar({
  user,
  fullName,
  className,
  textType = "heading-extraSmall"
}: UserAvatarProps) {
  const getInitials = (name: string) => {
    const parts = name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return parts;
  };
  const shortName = getInitials(fullName || user?.fullName || "N/A");

  return (
    <View
      className={cn(
        "h-[56px] w-[56px] bg-[#A3A3A3] rounded-full items-center justify-center",
        className
      )}
    >
      <Typography
        type={textType ? textType : "heading-extraSmall"}
        textColor="white"
      >
        {shortName}
      </Typography>
    </View>
  );
}
