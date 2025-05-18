import { AuthBiometrics } from "@/components/auth/auth-biometrics";
import { AuthLocal } from "@/components/auth/auth-local";
import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { useLocalAuth } from "@/hooks/use-local-auth";
import { useLocalPIN } from "@/hooks/use-local-pin";
import { useUserAuthenticateStore } from "@/stores";
import { exactDesign } from "@/utils";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function AuthenticatedLayout() {
  const { getColor } = useColorPalette();
  const { shouldAuthLocal, setShouldAuthLocal } = useLocalAuth();
  const { shouldPINLocal, setShouldPINLocal } = useLocalPIN();
  const { isLoggedIn, isFirst2FA } = useUserAuthenticateStore();

  const { isSignedIn, isLoaded } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Redirect href={"/login"} />;
  }

  if ((!isLoggedIn || isFirst2FA) && isLoaded) {
    return <Redirect href={"/success-2factor"} />;
  }

  return (
    <View className="flex-1">
      {shouldAuthLocal && (
        <AuthBiometrics onAuthenticated={() => setShouldAuthLocal(false)} />
      )}
      {shouldPINLocal && (
        <AuthLocal onAuthenticated={() => setShouldPINLocal(false)} />
      )}
      {!shouldPINLocal && (
        <Stack
          screenOptions={{
            headerShown: true,
            headerTintColor: getColor("--foreground"),
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: exactDesign(18),
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
            name="request_card_success"
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
            name="notification_center"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="point_received"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="transactions"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="review_transaction"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="transaction_result"
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
            name="statements"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="preview_statements"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="pin-verification"
            options={{
              headerShown: false
            }}
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
              headerTitle: `Personal information`,
              headerStyle: {
                backgroundColor: "#FFFFFF"
              }
            }}
          />
          <Stack.Screen
            name="cash_out_point"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="web_view" options={{ headerShown: false }} />
          <Stack.Screen name="our_agreement" options={{ headerShown: false }} />
          <Stack.Screen name="notifications" options={{ headerShown: false }} />
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
            name="success_phonenumber"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="success_homeaddress"
            options={{
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
            name="report_damaged"
            options={{
              headerShown: true,
              headerTitle: `Report lost or damaged`,
              headerShadowVisible: true,
              headerStyle: {
                backgroundColor: getColor("--background")
              }
            }}
          />
          <Stack.Screen
            name="lost"
            options={{
              headerShown: true,
              headerTitle: ``,
              headerStyle: {
                backgroundColor: getColor("--background")
              }
            }}
          />
          <Stack.Screen
            name="damaged"
            options={{
              headerShown: true,
              headerTitle: ``,
              headerStyle: {
                backgroundColor: getColor("--background")
              }
            }}
          />
          <Stack.Screen
            name="edit_phonenumber"
            options={{
              headerShown: true,
              headerTitle: ``,
              headerStyle: {
                backgroundColor: getColor("--background")
              }
            }}
          />
          <Stack.Screen
            name="verify_phonenumber"
            options={{
              headerShown: true,
              headerTitle: ``,
              headerStyle: {
                backgroundColor: getColor("--background")
              }
            }}
          />
          <Stack.Screen
            name="edit_homeaddress"
            options={{
              headerShown: true,
              headerTitle: ``,
              headerStyle: {
                backgroundColor: getColor("--background")
              }
            }}
          />
        </Stack>
      )}
    </View>
  );
}
