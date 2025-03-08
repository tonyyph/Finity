import { colors } from "@/constants/Colors";
import { useColorPalette } from "@/hooks/use-color-palette";
import { exactDesign } from "@/utils";
import { useLingui } from "@lingui/react";
import { Tabs } from "expo-router";
import { Image, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { getColor } = useColorPalette();
  const { i18n } = useLingui();
  const { width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-backgroundSubtle" style={{ paddingTop: top }}>
      <Tabs
        // tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShadowVisible: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: colors.tertiary,
          tabBarShowLabel: true,
          tabBarStyle: {
            borderTopWidth: 1,
            backgroundColor: getColor("--background"),
            borderColor: getColor("--border"),
            borderTopColor: getColor("--border"),
            height: bottom ? exactDesign(100) : exactDesign(80)
          },
          tabBarLabelStyle: {
            fontSize: exactDesign(12)
          },
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: exactDesign(16),
            color: getColor("--foreground")
          },
          headerStyle: {
            backgroundColor: getColor("--background")
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("@/assets/images/homeIcon.png")}
                resizeMode="contain"
                style={{ width: exactDesign(22), height: exactDesign(22) }}
                tintColor={color}
              />
            ),
            tabBarLabel: "Home",
            headerShown: false,
            headerTitle: `Home`,
            headerTitleStyle: { marginLeft: 5 },
            headerTitleAlign: "center"
          }}
        />
        <Tabs.Screen
          name="card"
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                resizeMode="contain"
                source={require("@/assets/images/cardIcon.png")}
                style={{ width: exactDesign(22), height: exactDesign(22) }}
                tintColor={color}
              />
            ),
            tabBarLabel: "Card",
            headerShown: false,
            headerTitle: `Card`,
            headerTitleStyle: { marginLeft: 5 },
            headerTitleAlign: "center"
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                resizeMode="contain"
                source={require("@/assets/images/profileIcon.png")}
                style={{ width: exactDesign(22), height: exactDesign(22) }}
                tintColor={color}
              />
            ),
            tabBarLabel: "Profile",
            headerShown: false,
            headerTitle: `Profile`,
            headerTitleStyle: { marginLeft: 5 },
            headerTitleAlign: "center"
          }}
        />
      </Tabs>
    </View>
  );
}
