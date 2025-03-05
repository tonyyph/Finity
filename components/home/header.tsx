import { useRouter } from "expo-router";
import { Image, View } from "react-native";
import { Text } from "../ui/text";
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";
import { exactDesign } from "@/utils";
import Touch from "../ui/touch";
import { colors } from "@/constants/Colors";

type HomeHeaderProps = {
  haveNoti?: boolean;
  onNoti?: (params?: any) => void;
};

export function HomeHeader({ haveNoti, onNoti }: HomeHeaderProps) {
  const { i18n } = useLingui();
  //   const { user } = useUser()
  const router = useRouter();
  const user = {
    id: "123",
    fullName: "Tony Phan",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C4E0BAQHRcd8MW8NoEQ/company-logo_200_200/company-logo_200_200/0/1631373100497?e=2147483647&v=beta&t=1pTjV_f6c_HEPpm-zTeobA6HYV_YNV4aLrGLGBB0K-w",
  };

  return (
    <View
      className="flex flex-row items-center justify-between gap-4 bg-background px-6 pb-3"
      style={{ backgroundColor: colors.backgroundSubtle }}
    >
      <View className="flex flex-1 flex-row items-center gap-3">
        <View className="flex-1 gap-1">
          <Text className="text-h3 font-bold">{`${t(i18n)`Hi`}, ${
            user.fullName
          }`}</Text>
        </View>
      </View>
      <Touch onPress={onNoti}>
        <Image
          source={require("@/assets/images/bellIcon.png")}
          style={{ width: exactDesign(22), height: exactDesign(22) }}
          resizeMode="contain"
        />
        {haveNoti && (
          <View className="rounded-full w-2 h-2 bg-orange-500 absolute right-0.5 top-0.5" />
        )}
      </Touch>
    </View>
  );
}
