import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { useUserAuthenticateStore } from "@/stores/user-authenticate/store";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function UnAuthenticatedLayout() {
  const { isLoggedIn } = useUserAuthenticateStore();
  const { getColor } = useColorPalette();

  const { isSignedIn } = useAuth();

  console.log(" UnAuthenticatedLayout 💯 isSignedIn:", isSignedIn);

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
        name="login-with-pin"
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
