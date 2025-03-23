import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Text } from "../ui/text";

type UserAvatarProps = {
  fullName?: string;
  className?: string;
  fallbackClassName?: string;
  fallbackLabelClassName?: string;
};

export function UserAvatar({
  fullName,
  className,
  fallbackClassName,
  fallbackLabelClassName
}: UserAvatarProps) {
  const shortName =
    fullName
      ?.split(" ")
      .map((name) => name[0].toUpperCase())
      .join("") ?? "";

  return (
    <Avatar
      alt={`${fullName}'s avatar`}
      className={cn("h-[56px] w-[56px]", className)}
    >
      <AvatarImage source={{ uri: undefined }} />
      <AvatarFallback className={fallbackClassName}>
        <Text
          className={cn(
            "text-center justify-center text-white text-[20px] font-medium font-['PP_Neue_Montreal'] leading-[25px] tracking-wide",
            fallbackLabelClassName
          )}
        >
          {shortName?.toUpperCase() ?? ""}
        </Text>
      </AvatarFallback>
    </Avatar>
  );
}
