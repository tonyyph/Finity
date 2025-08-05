import { AuthLocal, BackButton } from "@/components";
import { useColorPalette, useLocalPIN } from "@/hooks";
import { useUserAuthenticateStore } from "@/stores";
import { useNetwork } from "@/stores";
import { exactDesign } from "@/utils";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { isEmpty } from "lodash-es";
import { View } from "react-native";

export default function AuthenticatedLayout() {
  const { getColor } = useColorPalette();
  const { shouldPINLocal, setShouldPINLocal } = useLocalPIN();
  const { isConnected } = useNetwork();

  const { isLoggedIn, verificationPin } = useUserAuthenticateStore();

  const { isSignedIn, isLoaded } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Redirect href={"/login"} />;
  }

  if ((!isLoggedIn || isEmpty(verificationPin)) && isLoaded) {
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
          name="active-card"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="active-card-success"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="request-card-success"
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
          name="load-card"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="notification-center"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="transaction-point-detail"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="transaction-card-detail"
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
          name="review-transaction"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="transaction-result"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="send-point"
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
          name="preview-statements"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="pin-verification"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="profile-edit" options={{ headerShown: false }} />
        <Stack.Screen name="cash-out-point" options={{ headerShown: false }} />
        <Stack.Screen name="web-view" options={{ headerShown: false }} />
        <Stack.Screen name="our-agreement" options={{ headerShown: false }} />
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
          name="success-phonenumber"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="success-homeaddress"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="report-damaged" options={{ headerShown: false }} />
        <Stack.Screen name="lost" options={{ headerShown: false }} />
        <Stack.Screen name="damaged" options={{ headerShown: false }} />
        <Stack.Screen
          name="edit-phonenumber"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="verify-phonenumber"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="edit-homeaddress"
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
