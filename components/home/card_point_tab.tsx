import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";
import Typography from "../common/text-typography";
import CardTab from "./cardTap";
import PointsTap from "./pointsTap";

function CardAndPointTab() {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: "card", title: "Card" },
    { key: "points", title: "Points" }
  ]);

  const renderScene = SceneMap({
    card: CardTab,
    points: PointsTap
  });

  return (
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
              inactiveColor={"#404040"}
              labelAllowFontScaling
              label={({ route, focused, color }) => (
                <Typography
                  weight={focused ? "bold" : "medium"}
                  textColor={color}
                  className="px-3"
                >
                  {route.title}
                </Typography>
              )}
              activeColor={"#0A0A0A"}
            />
          )}
        />
      )}
      style={styles.tabViewContainer}
    />
  );
}

export default CardAndPointTab;

const styles = StyleSheet.create({
  indicatorContainerStyle: { backgroundColor: "white" },
  indicatorStyle: {
    backgroundColor: "black",
    height: 4,
    borderRadius: 100
  },
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5"
  },
  tabViewContainer: {
    minHeight: SCREEN_HEIGHT * 0.75
  }
});
