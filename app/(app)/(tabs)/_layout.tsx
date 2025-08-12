import {
  CardIcon,
  FillCardIcon,
  FillHomeIcon,
  FillProfileIcon,
  HomeIcon,
  ProfileIcon
} from "@/components";
import { colors } from "@/constants";
import { useColorPalette } from "@/hooks";
import { useUserAuthenticateStore } from "@/stores";
import { exactDesign } from "@/utils";
import { useAuth } from "@clerk/clerk-expo";
import { Tabs } from "expo-router";
import { useLayoutEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { getColor } = useColorPalette();
  const { bottom } = useSafeAreaInsets();
  const { setStoreUserId } = useUserAuthenticateStore();

  const { userId } = useAuth();
  useLayoutEffect(() => {
    if (userId) {
      !!userId && setStoreUserId(userId);
    }
  }, [userId, setStoreUserId]);
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
          height: bottom ? exactDesign(88) : exactDesign(68)
        },
        tabBarLabelStyle: {
          fontFamily: "NeueMontreal-Medium",
          fontWeight: "500",
          fontSize: exactDesign(12),
          lineHeight: exactDesign(16),
          letterSpacing: 0.6
        },
        headerStyle: {
          backgroundColor: getColor("--background")
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <FillHomeIcon /> : <HomeIcon />,
          tabBarLabel: "Home",
          headerShown: false,
          headerTitle: "Home",
          headerTitleStyle: { marginLeft: 5, fontSize: 24 },
          headerTitleAlign: "center"
        }}
      />
      <Tabs.Screen
        name="card"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <FillCardIcon /> : <CardIcon />,
          tabBarLabel: "Card",
          headerShown: false,
          headerTitle: "Card",
          headerTitleStyle: { marginLeft: 5, fontSize: 24 },
          headerTitleAlign: "center"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <FillProfileIcon /> : <ProfileIcon />,
          tabBarLabel: "Profile",
          headerShown: false,
          headerTitle: "Profile",
          headerTitleStyle: { marginLeft: 5, fontSize: 24 },
          headerTitleAlign: "left"
        }}
      />
    </Tabs>
  );
}
