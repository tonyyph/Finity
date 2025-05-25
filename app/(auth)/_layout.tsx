import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function UnAuthenticatedLayout() {
  const { getColor } = useColorPalette();

  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: getColor("--background")
          },
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
          headerTitle: ""
        }}
      >
        <Stack.Screen
          name="login"
          options={{
            headerLeft: () => null,
            headerShown: false
          }}
        />

        <Stack.Screen
          name="verify-2factor"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="access-denied"
          options={{
            headerStyle: {
              backgroundColor: getColor("--background")
            }
          }}
        />
        <Stack.Screen
          name="page-not-found"
          options={{
            headerStyle: {
              backgroundColor: getColor("--background")
            }
          }}
        />
      </Stack>
    </View>
  );
}
