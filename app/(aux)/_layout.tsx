import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function AuxiliaryLayout() {
  const { getColor } = useColorPalette();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor: getColor("--foreground"),
          headerShadowVisible: false,
          headerTitle: "",
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
          name="privacy-policy"
          options={{
            presentation: "modal",
            headerTitle: `Privacy Policy`
          }}
        />
        <Stack.Screen
          name="pin-verification"
          options={{
            headerShown: true,
            headerTitle: `Verification`,
            headerStyle: {
              backgroundColor: getColor("--background")
            }
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            presentation: "modal",
            headerTitle: `Sign Up`
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            presentation: "modal",
            headerTitle: `Forgot Password`
          }}
        />
        <Stack.Screen
          name="reset-password"
          options={{
            presentation: "modal",
            headerTitle: `Reset Password`
          }}
        />
        <Stack.Screen
          name="login-error"
          options={{
            presentation: "modal",
            headerTitle: `Login Error`
          }}
        />
        <Stack.Screen
          name="terms-of-service"
          options={{
            presentation: "modal",
            headerTitle: `Terms & Conditions`
          }}
        />
        <Stack.Screen
          name="pin-confirm"
          options={{
            headerLeft: () => <BackButton />,
            headerShown: true
          }}
        />
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
            headerLeft: () => <BackButton />,
            headerShown: true
          }}
        />
        <Stack.Screen
          name="pin-forgot"
          options={{
            headerLeft: () => <BackButton />,
            headerShown: false
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
