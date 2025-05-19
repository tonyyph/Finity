import { ArrowRightIcon } from "@/assets/icons/ArrowRightIcon";
import { ProtectIcon } from "@/assets/icons/ProtectIcon";
import { TermIcon } from "@/assets/icons/TermIcon";
import { MenuItem } from "@/components/common/menu-item";
import Header from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { router } from "expo-router";
import { View } from "react-native";

export default function OurAgreementScreen() {
  return (
    <View className="flex-1 bg-background">
      <Header onBack={router.back} title="Our agreements" />

      <ProgressBar />
      <View className="p-4">
        <MenuItem
          label={`Terms and conditions`}
          icon={TermIcon}
          onPress={() => {
            router.push({
              pathname: "/web_view",
              params: {
                title: "Terms and conditions",
                webLink:
                  "https://www.finity.co.uk/wp-content/uploads/2025/05/20250506-Finity-Terms-Conditions_Corporate-Rewards.pdf"
              }
            });
          }}
          rightSection={<ArrowRightIcon />}
          className="py-3"
        />
        <MenuItem
          label={`Privacy policy`}
          icon={ProtectIcon}
          onPress={() => {
            router.push({
              pathname: "/web_view",
              params: {
                title: "Privacy policy",
                webLink: "https://www.finity.co.uk/privacy-policy/"
              }
            });
          }}
          rightSection={<ArrowRightIcon />}
          className="py-3"
        />
      </View>
    </View>
  );
}
