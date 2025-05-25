import { ClockIcon, HouseIcon } from "@/assets";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useCardHolder } from "@/hooks/cardholders/useCardHolder";
import { useUserProfile } from "@/hooks/profile/useUserProfile";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

const DamagedScreen = () => {
  const [loading, setLoading] = useState<boolean>();
  const { handleReportOrDamaged } = useCardHolder();
  const { userProfile } = useUserProfile();

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleReportOrDamaged(true);
    }, 2000);
  };

  const onEditHomeAddress = () => {
    router.push("/(app)/edit_homeaddress");
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <View className="flex-1 px-4 gap-3 pt-6">
          <Typography type="heading-small" weight="semibold">
            Confirm your address
          </Typography>
          <View className="flex-row gap-3 pt-6">
            <HouseIcon />
            <View>
              <Typography type="body-default" weight="semibold">
                Will be delivered to
              </Typography>
              {userProfile?.address?.addressLine1 && (
                <Typography weight="regular">
                  {userProfile?.address?.addressLine1}
                </Typography>
              )}
              {userProfile?.address?.addressLine2 && (
                <Typography weight="regular">
                  {userProfile?.address?.addressLine2}
                </Typography>
              )}
              {userProfile?.address?.city && (
                <Typography weight="regular">
                  {userProfile?.address?.city}
                </Typography>
              )}
              {userProfile?.address?.postCode && (
                <Typography weight="regular">
                  {userProfile?.address?.postCode}
                </Typography>
              )}
              <TouchableOpacity onPress={onEditHomeAddress}>
                <Typography weight="regular" className="mt-2 underline">
                  Change address?
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-1 flex-row gap-3 pt-6">
            <ClockIcon />
            <View>
              <Typography type="body-default" weight="semibold">
                Expected delivery time
              </Typography>
              <Typography weight="regular">
                Should arrive within 5-7 business days
              </Typography>
            </View>
          </View>
        </View>
        <View className="px-6 gap-6">
          <Button
            variant="default"
            size={"lg"}
            disabled={loading}
            className="rounded-full bg-primary h-[48px]"
            loading={loading}
            onPress={handleConfirm}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {loading ? `Confirming...` : `Confirm and request card`}
            </Typography>
          </Button>
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  );
};

export default DamagedScreen;
