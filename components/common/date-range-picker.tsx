import { cn, sleep, formatDateShort } from "@/lib";
import { BottomIndicatorAvoidingView } from "@/utils";
import { type BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { ArrowRightIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import { Button, Text } from "../ui";
import { BottomSheet } from "./bottom-sheet";

function SpinnerDatePicker({
  value,
  onChange,
  maximumDate,
  minimumDate,
  title
}: {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  title?: string;
}) {
  const [date, setDate] = useState<Date>(value ?? new Date());

  return (
    <View className="gap-4">
      <Text className="mx-6 mt-2 text-center font-[NeueMontreal-Medium] text-foreground">
        {title}
      </Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="spinner"
        onChange={(_, selectedDate) => {
          setDate(selectedDate!);
        }}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
      />
      <Button
        className="mx-6"
        onPress={() => {
          Haptics.selectionAsync();
          onChange(date);
        }}
      >
        <Text>{`Save`}</Text>
      </Button>
    </View>
  );
}

export function DateRangePicker({
  value = [],
  onChange,
  maximumDate,
  minimumDate
}: {
  value?: Date[];
  onChange?: (date?: Date[]) => void;
  maximumDate?: Date;
  minimumDate?: Date;
}) {
  const sheetFromRef = useRef<BottomSheetModal>(null);
  const sheetToRef = useRef<BottomSheetModal>(null);
  const [fromDate, toDate] = value ?? [];

  return (
    <>
      <View className="flex-row items-center gap-4">
        <Button
          variant="outline"
          className="h-11 flex-1"
          onPress={() => {
            Haptics.selectionAsync();
            Keyboard.dismiss();
            sheetFromRef.current?.present();
          }}
        >
          <Text
            className={cn(fromDate ? "text-primary" : "text-muted-foreground")}
          >
            {fromDate ? formatDateShort(fromDate) : `From date`}
          </Text>
        </Button>
        <ArrowRightIcon className="h-5 w-5 text-muted-foreground" />
        <Button
          variant="outline"
          className="h-11 flex-1"
          onPress={() => {
            Haptics.selectionAsync();
            Keyboard.dismiss();
            sheetToRef.current?.present();
          }}
        >
          <Text
            className={cn(toDate ? "text-primary" : "text-muted-foreground")}
          >
            {toDate ? formatDateShort(toDate) : `To date`}
          </Text>
        </Button>
      </View>
      <BottomSheet ref={sheetFromRef} index={0} enableDynamicSizing>
        <BottomSheetView>
          <SpinnerDatePicker
            title={`Period start date`}
            value={fromDate}
            onChange={async (date = fromDate) => {
              sheetFromRef.current?.close();
              await sleep(500);
              onChange?.([date, toDate]);
              if (!toDate) {
                // onChange?.([date, dayjsExtended(date).add(1, 'day').toDate()])
                sheetToRef.current?.present();
              } else {
                onChange?.([date, toDate]);
              }
            }}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
          />
          <BottomIndicatorAvoidingView />
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet ref={sheetToRef} index={0} enableDynamicSizing>
        <BottomSheetView>
          <SpinnerDatePicker
            title={`Period end date`}
            value={toDate}
            onChange={async (date = toDate) => {
              sheetToRef.current?.close();
              await sleep(500);
              onChange?.([fromDate, date]);
            }}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
          />
          <BottomIndicatorAvoidingView />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
