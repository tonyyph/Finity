import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function UnAuthenticatedLayout() {
  const { getColor } = useColorPalette();

  const { isSignedIn } = useAuth();

  console.log(" UnAuthenticatedLayout 💯 isSignedIn:", isSignedIn);

  if (isSignedIn) {
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
