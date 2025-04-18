import { ClockIcon, HouseIcon } from "@/assets";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useUserSettingsStore } from "@/stores";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DamagedScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { setIsDamagedCard } = useUserSettingsStore();
  const [loading, setLoading] = useState<boolean>();

  const handleConfirm = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsDamagedCard(true);
      router.push({
        pathname: "/(app)/request_card_success"
      });
    }, 2000);
  }, []);

  return (
    <View className="flex-1 bg-background" style={{ paddingBottom: bottom }}>
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
              <Typography weight="regular">
                {`95 Townshend Terrace\nManchester\nTW9 1XL`}
              </Typography>
              <Typography weight="regular" className="mt-2 underline">
                Change address?
              </Typography>
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
    </View>
  );
};

export default DamagedScreen;
