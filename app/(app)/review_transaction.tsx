import { ArrowDownIcon } from "@/assets";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { formatNumber } from "@/utils";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

function ReviewTransactionScreen() {
  const { type, amount } = useLocalSearchParams();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      router.push({
        pathname: "/transaction_result",
        params: {
          type: type,
          amount: amount,
          success: "true"
        }
      });
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <Header onBack={router.back} title="Review transactions" />
        <ProgressBar completeAnimation={true} />

        <View className="flex-1 pt-4">
          <View className="px-4 gap-2">
            <View className="bg-neutral-100 px-5 py-4 items-start justify-center gap-1 rounded-xl">
              <Typography type="body-large" weight="semibold">
                {`Load`}
              </Typography>
              <Typography>{`${amount} points`}</Typography>
            </View>
            <View
              className="bg-white rounded-full self-center absolute p-[6px] top-[50%] z-10"
              style={styles.arrowStyle}
            >
              <ArrowDownIcon />
            </View>
            <View className="bg-neutral-100 px-5 py-4 items-start justify-center gap-1 rounded-xl">
              <Typography type="body-large" weight="semibold">
                {`You’ll receive`}
              </Typography>
              <Typography>
                {`£${formatNumber({
                  value: Number(amount?.toString().replace(/,/g, "")) * 0.1
                })}`}
              </Typography>
            </View>
          </View>
          {/* point balance */}
          <View className="flex-row gap-1 items-center px-6 pt-2">
            <Typography type="body-small" weight="medium" textColor="#525252">
              {`Card balance after load: £${formatNumber({
                value: Number(amount?.toString().replace(/,/g, "")) * 0.1
              })}`}
            </Typography>
          </View>
        </View>
        {/* Bottom */}
        <View className="px-4">
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            loading={loading}
            disabled={loading}
            onPress={handleConfirm}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {loading ? `Loading card...` : `Confirm and load`}
            </Typography>
          </Button>
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default ReviewTransactionScreen;

const styles = StyleSheet.create({
  arrowStyle: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
    backgroundColor: "#ffffff"
  }
});
