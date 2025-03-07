import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { useUserAuthenticateStore } from "@/stores/user-authenticate/store";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";

export default function UnAuthenticatedLayout() {
  const { isLoggedIn } = useUserAuthenticateStore();
  const { getColor } = useColorPalette();

  if (isLoggedIn) {
    return <Redirect href={"/"} />;
  }

  return (
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
        name="success-2factor"
        options={{
          headerLeft: () => <BackButton />,
          headerShown: false
        }}
      />
      <Stack.Screen
        name="pin-success"
        options={{
          headerLeft: () => <BackButton />,
          headerShown: false
        }}
      />
      <Stack.Screen
        name="pin-change-success"
        options={{
          headerLeft: () => <BackButton />,
          headerShown: false
        }}
      />
      <Stack.Screen
        name="pin-verify"
        options={{
          headerStyle: {
            backgroundColor: getColor("--background")
          }
        }}
      />
      <Stack.Screen
        name="pin-confirm"
        options={{
          headerStyle: {
            backgroundColor: getColor("--background")
          }
        }}
      />
      <Stack.Screen
        name="biometrics"
        options={{
          headerLeft: () => <BackButton />,
          headerShown: false
        }}
      />
      <Stack.Screen
        name="biometrics-success"
        options={{
          headerLeft: () => <BackButton />,
          headerShown: false
        }}
      />
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
          headerStyle: {
            backgroundColor: getColor("--background")
          }
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
      <Stack.Screen
        name="st-went-wrong"
        options={{
          headerStyle: {
            backgroundColor: getColor("--background")
          }
        }}
      />
    </Stack>
  );
}
