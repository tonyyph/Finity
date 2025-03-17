import { exactDesign } from "@/utils";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";
import Typography from "../common/text-typography";
import Touch from "../ui/touch";

type HomeHeaderProps = {
  haveNotification?: boolean;
  onNotification?: (params?: any) => void;
};

export function HomeHeader({
  haveNotification,
  onNotification
}: HomeHeaderProps) {
  //   const { user } = useUser()
  const router = useRouter();
  const user = {
    id: "123",
    fullName: "Tony Phan",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C4E0BAQHRcd8MW8NoEQ/company-logo_200_200/company-logo_200_200/0/1631373100497?e=2147483647&v=beta&t=1pTjV_f6c_HEPpm-zTeobA6HYV_YNV4aLrGLGBB0K-w"
  };

  return (
    <View className="flex flex-row items-center justify-between gap-4 bg-backgroundSubtle px-6 pb-3">
      <View className="flex flex-1 flex-row items-center gap-3">
        <View className="flex-1 gap-1">
          <Typography weight="semibold" type="heading-small">
            {`${`Hi`}, ${user.fullName}`}
          </Typography>
        </View>
      </View>
      <Touch onPress={onNotification}>
        <Image
          source={require("@/assets/images/bellIcon.png")}
          style={{ width: exactDesign(22), height: exactDesign(22) }}
          resizeMode="contain"
        />
        {haveNotification && (
          <View className="rounded-full w-2 h-2 bg-orange-500 absolute right-0.5 top-0.5" />
        )}
      </Touch>
    </View>
  );
}
