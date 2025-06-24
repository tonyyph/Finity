import { GlobalProgressBar } from "@/components/common";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { MenuItem } from "@/components/common/menu-item";
import { Typography } from "@/components/common/text-typography";
import { Header } from "@/components/ui/header";
import { Separator } from "@/components/ui/separator";
import { Touch } from "@/components/ui/touch";
import { useStatements } from "@/hooks/profile/useStatements";
import { listOfMonths, listOfYears } from "@/lib/constaints";
import { getAvailableMonthsByYear } from "@/lib/date";
import { userStore } from "@/stores/userStore";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Image, Keyboard, View } from "react-native";

function StatementScreen() {
  const { type, title } = useLocalSearchParams();
  const sheetRef = useRef<BottomSheetModal>(null);
  const userProfile = userStore?.getState().userProfile;
  const { handleGeneratePointPDF, handleGenerateCardPDF } = useStatements();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const dateCreated = new Date(userProfile?.dateCreated || "");
  const createdYear = dateCreated.getFullYear();

  const now = new Date();
  const currentYear = String(now.getFullYear());
  const currentMonth = listOfMonths[now.getMonth()].value;

  const [yearOfFilter, setYearOfFilter] = useState(currentYear);
  const [monthOfFilter, setMonthOfFilter] = useState(currentMonth);

  const validYears = listOfYears.filter((y) => Number(y.value) >= createdYear);

  const validMonthIds = getAvailableMonthsByYear(
    dateCreated,
    Number(yearOfFilter),
    now
  );

  const filteredMonths = listOfMonths.filter((month) =>
    validMonthIds.includes(month.id + 1)
  );

  const handlePress = ({ id, value }: { id: number; value: string }) => {
    if (debounceRef.current) return;
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
    }, 1500);

    if (type === "points") {
      handleGeneratePointPDF({ month: value, year: yearOfFilter });
    } else if (type === "card") {
      handleGenerateCardPDF({ month: value, year: yearOfFilter });
    }

    sheetRef.current?.close();
  };

  const onPressYearFilter = () => {
    sheetRef.current?.present();
    Keyboard.dismiss();
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <Header onBack={router.back} title={title as string} />
        <GlobalProgressBar />

        <View className="flex-1 p-4 gap-2">
          <Typography type="body-default" weight="regular">
            {`Statements are automatically generated on the first day of every month.`}
          </Typography>

          {/* Filter by year */}
          <View className="flex-row justify-between items-center gap-3 mx-2 mt-6">
            <Typography type="body-default" weight="medium" textColor="#404040">
              {`Filter by year`}
            </Typography>
            <Touch
              onPress={onPressYearFilter}
              className="flex-1 flex-row justify-between items-center rounded-lg z-10 border-[1px] border-subtitle px-3"
            >
              <View className="h-[48px] items-center justify-center">
                <Typography weight="medium" type="body-default">
                  {yearOfFilter}
                </Typography>
              </View>
              <Image
                source={require("@/assets/images/caret-down.png")}
                className="w-[24px] h-[24px]"
              />
            </Touch>
          </View>

          {/* Month list */}
          <FlatList
            data={filteredMonths}
            keyExtractor={(item, index) => `${index}-${item.value}`}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <BottomIndicatorAvoidingView />}
            renderItem={({ item, index }) => (
              <View key={`${index}-${item.value}`}>
                <MenuItem
                  label={item.value}
                  onPress={() => handlePress(item)}
                  className="py-3"
                />
                {index !== filteredMonths.length - 1 && (
                  <Separator className="my-2" />
                )}
              </View>
            )}
          />
        </View>

        {/* Bottom Sheet for Year Filter */}
        <BottomSheet ref={sheetRef} index={0} snapPoints={["30%"]}>
          <BottomSheetView className="min-h-[50%] mt-1">
            <Header
              title="Filter by year"
              spacing={false}
              onRightFunction={() => sheetRef.current?.close()}
            />
            <View className="p-4 my-3 mb-10">
              {validYears.map((item, index) => (
                <View key={`${index}-${item.value}`}>
                  <MenuItem
                    label={item.value}
                    onPress={() => {
                      setYearOfFilter(item.value);

                      const selectedYear = Number(item.value);
                      const validIds = getAvailableMonthsByYear(
                        dateCreated,
                        selectedYear,
                        now
                      );

                      const currentSelected = listOfMonths.find(
                        (m) => m.value === monthOfFilter
                      );

                      if (
                        !currentSelected ||
                        !validIds.includes(currentSelected.id + 1)
                      ) {
                        const fallback = listOfMonths.find(
                          (m) => m.id + 1 === validIds[0]
                        );
                        if (fallback) setMonthOfFilter(fallback.value);
                      }

                      sheetRef.current?.close();
                    }}
                    className="py-3"
                  />
                  {index !== validYears.length - 1 && (
                    <Separator className="my-3" />
                  )}
                </View>
              ))}
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </View>
  );
}

export default StatementScreen;
