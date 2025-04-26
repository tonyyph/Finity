import { View } from "react-native";
import Typography from "../common/text-typography";
import Touch from "../ui/touch";

type Props = {
  onLoadCard?: (params?: any) => void;
  onSendPoints?: (params?: any) => void;
};

const CardButtonGroup = ({ onLoadCard, onSendPoints }: Props) => {
  return (
    <View className="flex-row gap-2 pl-4 pr-4 mb-4">
      <Touch
        onPress={onLoadCard}
        className="bg-black h-[48px] justify-center items-center flex-1 rounded-full"
      >
        <Typography weight="medium" textColor="white" type="body-default">
          Load card
        </Typography>
      </Touch>
      <Touch
        onPress={onSendPoints}
        className="bg-white h-[48px] justify-center items-center flex-1 rounded-full border border-[#D4D4D4]"
      >
        <Typography weight="medium" type="body-default">
          Send points
        </Typography>
      </Touch>
    </View>
  );
};

export default CardButtonGroup;
