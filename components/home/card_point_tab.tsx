import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";
import { Typography } from "../common/text-typography";
import CardTab from "./cardTap";
import PointsTap from "./pointsTap";
import { useListTransaction } from "@/hooks";

function CardAndPointTab() {
  const {
    pointList,
    cardList,
    fetchPaginatedCardTransactions,
    fetchPaginatedPointTransactions
  } = useListTransaction();
  useEffect(() => {
    fetchPaginatedPointTransactions({});
    fetchPaginatedCardTransactions({});
  }, [fetchPaginatedPointTransactions, fetchPaginatedCardTransactions]);

  const cardListHeight =
    cardList.length === 0
      ? SCREEN_HEIGHT / 2
      : cardList.length > 10
      ? 10 * 104
      : (cardList.length + 1) * 104;
  const pointTapHeight =
    pointList.length === 0
      ? SCREEN_HEIGHT / 2
      : pointList.length > 10
      ? 104 * 10
      : 104 * (pointList.length + 1);
  const [index, setIndex] = useState<number>(0);

  const tabViewHeight = index === 0 ? cardListHeight : pointTapHeight;

  const [routes] = useState([
    { key: "card", title: "Card" },
    { key: "points", title: "Points" }
  ]);

  const renderScene = SceneMap({
    card: CardTab,
    points: PointsTap
  });

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
        style={{ height: tabViewHeight }}
      />
    </View>
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
  }
});
