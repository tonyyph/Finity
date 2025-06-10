import { AuthLocal } from "@/components/auth/auth-local";
import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { useLocalPIN } from "@/hooks/use-local-pin";
import { useUserAuthenticateStore } from "@/stores";
import { useNetwork } from "@/stores/core/network-provider";
import { exactDesign } from "@/utils";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function AuthenticatedLayout() {
  const { getColor } = useColorPalette();
  const { shouldPINLocal, setShouldPINLocal } = useLocalPIN();
  const { isConnected } = useNetwork();

  const { isLoggedIn, isFirst2FA } = useUserAuthenticateStore();

  const { isSignedIn, isLoaded } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Redirect href={"/login"} />;
  }

  if ((!isLoggedIn || isFirst2FA) && isLoaded) {
    return <Redirect href={"/success-2factor"} />;
  }

  if (!isConnected) {
    return <Redirect href={"/offline"} />;
  }

  return (
    <View className="flex-1">
      {shouldPINLocal && (
        <AuthLocal onAuthenticated={() => setShouldPINLocal(false)} />
      )}
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
          name="send_card"
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
          options={{ headerShown: false }}
        />
        <Stack.Screen name="profile-edit" options={{ headerShown: false }} />
        <Stack.Screen name="cash_out_point" options={{ headerShown: false }} />
        <Stack.Screen name="web_view" options={{ headerShown: false }} />
        <Stack.Screen name="our_agreement" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen
          name="biometrics"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="pin-current"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="pin-confirm-change"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="pin-verify-change"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="pin-success-change"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="biometrics-success"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="success_phonenumber"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="success_homeaddress"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="report_damaged" options={{ headerShown: false }} />
        <Stack.Screen name="lost" options={{ headerShown: false }} />
        <Stack.Screen name="damaged" options={{ headerShown: false }} />
        <Stack.Screen
          name="edit_phonenumber"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="verify_phonenumber"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="edit_homeaddress"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="st-went-wrong"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </View>
  );
}
