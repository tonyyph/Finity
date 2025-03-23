import { colors } from "@/constants/Colors";
import { useColorPalette } from "@/hooks/use-color-palette";
import { useUserAuthenticateStore } from "@/stores";
import { exactDesign } from "@/utils";
import { Redirect, Tabs } from "expo-router";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { getColor } = useColorPalette();
  const { top, bottom } = useSafeAreaInsets();

  const { isLoggedIn, isFirst2FA } = useUserAuthenticateStore();

  console.log(" TabLayout 💯 isFirst2FA:", isFirst2FA);

  console.log(" TabLayout 💯 isLoggedIn:", isLoggedIn);

  if (!isLoggedIn || isFirst2FA) {
    return <Redirect href={"/(app)/success-2factor"} />;
  }

  return (
    <Tabs
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
          fontFamily: "PP Neue Montreal",
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
          headerTitleStyle: { marginLeft: 5, fontSize: 24 },
          headerTitleAlign: "left"
        }}
      />
    </Tabs>
  );
}
