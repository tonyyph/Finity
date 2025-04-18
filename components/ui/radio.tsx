import { memoFC } from "@/utils";
import { View } from "react-native";
import { RadioNonSelectedIcon, RadioSelectedIcon } from "../common/icons";

type Props = {
  selected: boolean;
};

export const Radio = memoFC(({ selected }: Props) => {
  return (
    <View>{selected ? <RadioSelectedIcon /> : <RadioNonSelectedIcon />}</View>
  );
});
