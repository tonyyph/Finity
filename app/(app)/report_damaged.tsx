import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { Radio } from "@/components/ui/radio";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ReportLostOrDamagedScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const [reportType, setReportType] = useState<string>("");

  const handleContinue = useCallback(() => {
    if (reportType === "lost") {
      router.push({
        pathname: "/lost"
      });
    } else {
      router.push({
        pathname: "/damaged"
      });
    }
  }, [reportType]);

  const handleReportType = (type: string) => {
    setReportType(type);
  };

  return (
    <View className="flex-1 bg-background" style={{ paddingBottom: bottom }}>
      <View className="flex-1 pt-4">
        <View className="flex-1 px-6 gap-3">
          <TouchableOpacity
            onPress={handleReportType.bind(null, "lost")}
            className={cn(
              "py-3 px-4 border border-[#D4D4D4] rounded-xl gap-3 flex-row",
              reportType === "lost" &&
                "border-[2px] border-[#FF885D] bg-[#FFF2ED]"
            )}
          >
            <Radio selected={reportType === "lost" ? true : false} />
            <View className="gap-1 flex-1">
              <Typography weight="semibold">Lost or stolen</Typography>
              <Typography textColor="#404040" weight="regular">
                Your current card will be immediately deactivated, and we’ll
                send you a new one.
              </Typography>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReportType.bind(null, "damaged")}
            className={cn(
              "py-3 px-4 border border-[#D4D4D4] rounded-xl gap-3 flex-row",
              reportType === "damaged" &&
                "border-[2px] border-[#FF885D] bg-[#FFF2ED]"
            )}
          >
            <Radio selected={reportType === "damaged" ? true : false} />
            <View className="gap-1 flex-1 pr-3">
              <Typography weight="semibold">Damaged card</Typography>
              <Typography textColor="#404040" weight="regular">
                You can continue using your existing card until the new one
                arrives.
              </Typography>
            </View>
          </TouchableOpacity>
        </View>
        <View className="px-4 gap-6">
          <Button
            variant="default"
            size={"lg"}
            disabled={reportType === ""}
            className="rounded-full bg-primary h-[48px]"
            onPress={handleContinue}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {`Continue`}
            </Typography>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ReportLostOrDamagedScreen;
