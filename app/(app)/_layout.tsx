import { AuthBiometrics } from "@/components/auth/auth-biometrics";
import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { useLocalAuth } from "@/hooks/use-local-auth";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function AuthenticatedLayout() {
  const { getColor } = useColorPalette();
  const { shouldAuthLocal, setShouldAuthLocal } = useLocalAuth();

  const { isSignedIn, isLoaded } = useUser();

  console.log(" AuthenticatedLayout 💯 isSignedIn useUser:", isSignedIn);

  if (!isSignedIn && isLoaded) {
    return <Redirect href={"/login"} />;
  }

  return (
    <View className="flex-1">
      {shouldAuthLocal && (
        <AuthBiometrics onAuthenticated={() => setShouldAuthLocal(false)} />
      )}

      {/* {!isLoginWithPin && <AuthLocal onAuthenticated={() => {}} />} */}

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
            backgroundColor: "#FAFAFA"
          },
          headerTitle: "",
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
            headerLeft: () => <BackButton />,
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
            headerLeft: () => <BackButton />,
            headerShown: true
          }}
        />
        <Stack.Screen
          name="load_card"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="send-card"
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
          name="pin-forgot"
          options={{
            headerStyle: {
              backgroundColor: getColor("--background")
            }
          }}
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
