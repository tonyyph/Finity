import { exactDesign, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TabBar, TabBarItem, TabView } from "react-native-tab-view";
import Typography from "../common/text-typography";
import Touch from "../ui/touch";
import CardTab from "./cardTap";
import PointsTap from "./pointsTap";

type Props = {
  onLoadCard?: (params?: any) => void;
  onSendPoints?: (params?: any) => void;
};

const routes = [
  { key: "card", title: "Card" },
  { key: "points", title: "Points" }
];

function CardAndPointTab({ onLoadCard, onSendPoints }: Props) {
  const [index, setIndex] = useState<number>(0);

  const renderScene = ({ route }: any) => {
    if (Math.abs(index - routes.indexOf(route)) > 2) {
      return <View />;
    } else {
      switch (route.key) {
        case "card":
          return <CardTab />;
        case "points":
          return <PointsTap />;
        default:
          break;
      }
    }
  };

  return (
    <View className="flex-1 ">
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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: SCREEN_WIDTH }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: "black",
              height: exactDesign(4),
              borderRadius: exactDesign(100)
            }}
            contentContainerStyle={{
              shadowColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#E5E5E5"
            }}
            indicatorContainerStyle={{ backgroundColor: "white" }}
            renderTabBarItem={(props) => (
              <TabBarItem
                {...props}
                key={`${props.key}`}
                labelStyle={[styles.labelStyle]}
                inactiveColor={"#404040"}
                labelAllowFontScaling
                activeColor="black"
              />
            )}
          />
        )}
        style={styles.tabVIewContainer}
      />
      {/* <CardTab /> */}
    </View>
  );
}
export default CardAndPointTab;

const styles = StyleSheet.create({
  tabVIewContainer: {
    minHeight: SCREEN_HEIGHT / 2
  },
  labelStyle: {
    color: "black",
    fontSize: 16,
    fontFamily: "PP Neue Montreal",
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: 0.48
  }
});
