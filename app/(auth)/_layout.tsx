import { BackButton } from "@/components/common/back-button";
import { useUserAuthenticateStore } from "@/stores/user-authenticate/store";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";

export default function UnAuthenticatedLayout() {
  const { isLoggedIn } = useUserAuthenticateStore();

  if (isLoggedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "230 8% 85%"
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
            backgroundColor: "230 12% 81%"
          }
        }}
      />
      <Stack.Screen
        name="access-denied"
        options={{
          headerStyle: {
            backgroundColor: "230 12% 81%"
          }
        }}
      />
      <Stack.Screen
        name="page-not-found"
        options={{
          headerStyle: {
            backgroundColor: "230 12% 81%"
          }
        }}
      />
      <Stack.Screen
        name="st-went-wrong"
        options={{
          headerStyle: {
            backgroundColor: "230 12% 81%"
          }
        }}
      />
    </Stack>
  );
}
