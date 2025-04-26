import { exactDesign, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TabBar, TabBarItem, TabView } from "react-native-tab-view";
import CardTab from "./cardTap";
import PointsTap from "./pointsTap";

const routes = [
  { key: "card", title: "Card" },
  { key: "points", title: "Points" }
];

function CardAndPointTab() {
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
    <View className="flex-1 px-4 bg-white shadow-md shadow-slate-200">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: SCREEN_WIDTH }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicatorStyle}
            contentContainerStyle={styles.containerStyle}
            indicatorContainerStyle={styles.indicatorContainerStyle}
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
  indicatorContainerStyle: { backgroundColor: "white" },
  indicatorStyle: {
    backgroundColor: "black",
    height: exactDesign(4),
    borderRadius: exactDesign(100)
  },
  containerStyle: {
    shadowColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5"
  },
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
