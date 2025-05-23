import { TouchableOpacity, View } from "react-native";
import Typography from "../common/text-typography";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

type ProfileItemProps = {
  title: string;
  topicTitle?: string;
  value: string;
  value0?: string;
  value1?: string;
  loading?: boolean;
  loadingMultiple?: boolean;
  value2?: string;
  showDivider?: boolean;
  canEdit?: boolean;
  onPress?: () => void;
};
export const ProfileItem = ({
  title,
  topicTitle,
  value,
  value0,
  value1,
  value2,
  showDivider = true,
  canEdit = false,
  loading = false,
  loadingMultiple = false,
  onPress
}: ProfileItemProps) => {
  if (loading) {
    return (
      <View>
        <View className="flex-row max-h-[48px] items-center w-full justify-between gap-2">
          <View className="gap-1 flex-1">
            {!!title && (
              <Typography weight="regular" textColor="#404040">
                {title}
              </Typography>
            )}
            {!!topicTitle && (
              <Typography type="body-large" weight="semibold" className="mb-2">
                {topicTitle}
              </Typography>
            )}
            <Skeleton className="h-5 w-[60%] rounded-full my-1" />
          </View>
        </View>
        {showDivider && <Separator className="mt-3 mb-4" />}
      </View>
    );
  }

  if (loadingMultiple) {
    return (
      <View>
        <View className="flex-row items-center w-full justify-between gap-3">
          <View className="gap-1 flex-1">
            {!!title && (
              <Typography weight="regular" textColor="#404040">
                {title}
              </Typography>
            )}
            <Skeleton className="h-5 w-[60%] rounded-full my-1" />
            <Skeleton className="h-5 w-[70%] rounded-full my-1" />
            <Skeleton className="h-5 w-[80%] rounded-full my-1" />
            <Skeleton className="h-5 w-[90%] rounded-full my-1" />
          </View>
        </View>
        {showDivider && <Separator className="mt-3 mb-4" />}
      </View>
    );
  }

  return (
    <View key={title + value}>
      <View className="flex flex-1 flex-row items-center justify-between gap-3">
        <View className="gap-0.5">
          {!!title && (
            <Typography weight="regular" textColor="#404040">
              {title}
            </Typography>
          )}
          {!!topicTitle && (
            <Typography type="body-large" weight="semibold" className="mb-2">
              {topicTitle}
            </Typography>
          )}
          <Typography>{value}</Typography>
          {!!value0 && <Typography>{value0 ?? ""}</Typography>}
          {!!value1 && <Typography>{value1 ?? ""}</Typography>}
          {!!value2 && <Typography>{value2 ?? ""}</Typography>}
        </View>
        {canEdit && (
          <TouchableOpacity
            activeOpacity={0.5}
            className="rounded-full border border-[#D4D4D4] px-3 py-1.5 bg-white active:bg-[#E5E5E5]"
            onPress={onPress}
          >
            <Typography>{`Edit`}</Typography>
          </TouchableOpacity>
        )}
      </View>
      {showDivider && <Separator className="mt-3 mb-4" />}
    </View>
  );
};
export default ProfileItem;
