import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TabBar, TabBarItem, TabView } from "react-native-tab-view";
import { Typography } from "../common/text-typography";
import TransactionCardTap from "./transactionCardTap";
import TransactionPointTap from "./transactionPointTap";

const routes = [
  { key: "card", title: "Card" },
  { key: "points", title: "Points" }
];

export function TransactionTab({ initTab }: { initTab?: number }) {
  const [index, setIndex] = useState<number>(initTab || 0);

  const renderScene = ({ route }: any) => {
    if (Math?.abs?.(index - routes.indexOf(route)) > 2) {
      return <View />;
    } else {
      switch (route.key) {
        case "card":
          return <TransactionCardTap />;
        case "points":
          return <TransactionPointTap />;
        default:
          break;
      }
    }
  };

  return (
    <View className="flex-1">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: SCREEN_WIDTH }}
        lazy
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
    </View>
  );
}

export default TransactionTab;

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
    minHeight: SCREEN_HEIGHT
  }
});
