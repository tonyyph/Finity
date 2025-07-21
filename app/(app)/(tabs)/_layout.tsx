import { CardIcon } from "@/assets/icons/CardIcon";
import { FillCardIcon } from "@/assets/icons/FillCardIcon";
import { FillHomeIcon } from "@/assets/icons/FillHomeIcon";
import { FillProfileIcon } from "@/assets/icons/FillProfileIcon";
import { HomeIcon } from "@/assets/icons/HomeIcon";
import { ProfileIcon } from "@/assets/icons/ProfileIcon";
import { colors } from "@/constants/Colors";
import { useColorPalette } from "@/hooks/use-color-palette";
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
