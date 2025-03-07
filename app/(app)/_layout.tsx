import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { useUserAuthenticateStore } from "@/stores/user-authenticate/store";
import { useLingui } from "@lingui/react";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function AuthenticatedLayout() {
  const { getColor } = useColorPalette();
  const { i18n } = useLingui();
  const { isLoggedIn, setIsLoggedIn } = useUserAuthenticateStore();

  if (!isLoggedIn) {
    return <Redirect href={"/login"} />;
  }

  const isOnBoarding = false;

  if (isOnBoarding) {
    return <Redirect href={"/onboarding/step-one"} />;
  }

  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor: getColor("--foreground"),
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
            color: getColor("--foreground")
          },
          headerStyle: {
            backgroundColor: getColor("--background")
          },
          headerLeft: () => <BackButton />
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="active_card"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="active_card_success"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="request_card"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="load_card"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="breaking-news"
          options={{ headerTitle: `Breaking News` }}
        />
        <Stack.Screen
          name="appearance"
          options={{
            presentation: "modal",
            headerTitle: `Appearance`
          }}
        />
        <Stack.Screen
          name="profile-edit"
          options={{
            presentation: "modal",
            headerTitle: `Fill Your Profile`
          }}
        />
        <Stack.Screen
          name="category/index"
          options={{
            headerTitle: `Categories`
          }}
        />
        <Stack.Screen
          name="explore-categories"
          options={{ headerTitle: `Explore Categories` }}
        />
        <Stack.Screen
          name="notifications"
          options={{ headerTitle: `Notifications` }}
        />
        <Stack.Screen
          name="search"
          options={{ headerTitle: `Search`, headerShown: false }}
        />
        <Stack.Screen
          name="feedback"
          options={{
            presentation: "modal",
            headerTitle: `Feedback`
          }}
        />
        <Stack.Screen
          name="language"
          options={{
            presentation: "modal",
            headerTitle: `Language`
          }}
        />
      </Stack>
    </View>
  );
}
