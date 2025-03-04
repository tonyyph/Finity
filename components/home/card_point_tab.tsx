import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Touch from "../ui/touch";
import { Text } from "../ui/text";
import { TabView, SceneMap, TabBar, TabBarItem } from "react-native-tab-view";
import { exactDesign, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import CardTab from "./cardTap";
import PointsTap from "./pointsTap";

type Props = {};

const routes = [
  { key: "card", title: "Card" },
  { key: "points", title: "Points" },
];

function CardAndPointTab({}: Props) {
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
        <Touch className="bg-black h-[48px] justify-center items-center flex-1 rounded-full">
          <Text className="color-white text-sm font-medium">Load card</Text>
        </Touch>
        <Touch className="bg-white h-[48px] justify-center items-center flex-1 rounded-full border border-[#D4D4D4]">
          <Text className="color-black text-sm font-medium">Send points</Text>
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
              borderRadius: exactDesign(100),
            }}
            style={{
              shadowColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#E5E5E5",
            }}
            indicatorContainerStyle={{ backgroundColor: "white" }}
            renderTabBarItem={(props) => (
              <TabBarItem
                {...props}
                key={`${props.key}`}
                labelStyle={[{ color: "black" }]}
                inactiveColor={"#404040"}
                activeColor="black"
              />
            )}
          />
        )}
        style={{
          minHeight: SCREEN_HEIGHT / 2,
          //  height:  Item height * Data.length
        }}
      />
      {/* <CardTab /> */}
    </View>
  );
}
export default CardAndPointTab;

const styles = StyleSheet.create({});
