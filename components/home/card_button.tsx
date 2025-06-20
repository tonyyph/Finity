import { View } from "react-native";
import { Typography } from "../common/text-typography";
import { Button } from "../ui/button";

type Props = {
  onLoadCard?: (params?: any) => void;
  onSendPoints?: (params?: any) => void;
  hasIssuedCard?: boolean;
};

export const CardButtonGroup = ({
  onLoadCard,
  onSendPoints,
  hasIssuedCard
}: Props) => {
  return (
    <View className="flex-row gap-2 pl-4 pr-4 mb-4">
      <Button
        variant="default"
        onPress={onLoadCard}
        size={"lg"}
        disabled={hasIssuedCard}
        className="bg-primary justify-center items-center flex-1 rounded-full"
      >
        <Typography
          weight="medium"
          textColor={hasIssuedCard ? "#A3A3A3" : "white"}
          type="body-default"
        >
          Load card
        </Typography>
      </Button>
      <Button
        variant="default"
        size={"lg"}
        onPress={onSendPoints}
        className="bg-white justify-center items-center flex-1 rounded-full border border-[#D4D4D4]"
      >
        <Typography weight="medium" type="body-default">
          Send points
        </Typography>
      </Button>
    </View>
  );
};

export default CardButtonGroup;
