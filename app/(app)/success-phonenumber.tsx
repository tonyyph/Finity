import { getUserProfile } from "@/api";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { userStore } from "@/stores/userStore";
import {
  BottomIndicatorAvoidingView,
  TopIndicatorAvoidingView
} from "@/utils/spacing";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, View } from "react-native";

function SuccessPhoneNumberScreen() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: session } = await getUserProfile();
        userStore.setState({ userProfile: session as UserProfile });
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    loading && fetchUserProfile();
  }, [loading]);

  const handleContinue = useCallback(() => {
    router.dismissAll();
  }, []);

  return (
    <View className="flex-1 bg-background">
      <TopIndicatorAvoidingView />
      <View className="flex-1">
        <View className="flex-1 px-4 gap-3 items-center mt-40">
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={require("@/assets/images/success-filled.png")}
          />
          <Typography type="heading-small" weight="semibold">
            Mobile number changed
          </Typography>
          <Typography weight="regular" className="text-center mx-4">
            Your mobile number has been updated successfully.
          </Typography>
        </View>
        <View className="px-6 gap-6">
          <Button
            variant="default"
            size={"lg"}
            disabled={loading}
            className="rounded-full bg-primary h-[48px]"
            onPress={handleContinue}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {`Continue`}
            </Typography>
          </Button>
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default SuccessPhoneNumberScreen;
