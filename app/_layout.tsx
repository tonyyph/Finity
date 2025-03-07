import { CustomPaletteWrapper } from "@/components/common/custom-palette-wrapper";
import { ToastRoot } from "@/components/common/toast";
import { LocaleProvider } from "@/locales/provider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import { cssInterop } from "nativewind";
import { PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Svg from "react-native-svg";
import "../global.css";
import "../utils/ReactotronConfig";
import { StatusBar } from "react-native";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@/lib/cache";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true }
  }
});
cssInterop(LinearGradient, {
  className: {
    target: "style"
  }
});

cssInterop(LottieView, {
  className: {
    target: "style"
  }
});

export const unstable_settings = {
  initialRouteName: "(app)"
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "NeueMontreal-Regular": require("../assets/fonts/ppneuemontreal-book.otf"),
    "NeueMontreal-Medium": require("../assets/fonts/ppneuemontreal-medium.otf"),
    "NeueMontreal-SemiBold": require("../assets/fonts/ppneuemontreal-semibolditalic.otf"),
    "NeueMontreal-Bold": require("../assets/fonts/ppneuemontreal-bold.otf")
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PostHogProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY!}
      options={{
        host: process.env.EXPO_PUBLIC_POSTHOG_HOST!,
        disabled: false
      }}
    >
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <ClerkLoaded>
          <LocaleProvider>
            <ThemeProvider value={DefaultTheme}>
              <CustomPaletteWrapper>
                <SafeAreaProvider>
                  <GestureHandlerRootView>
                    <KeyboardProvider>
                      <BottomSheetModalProvider>
                        <Stack screenOptions={{ headerShown: false }}>
                          <Stack.Screen
                            name="(aux)"
                            options={{
                              presentation: "modal"
                            }}
                          />
                        </Stack>
                        <ToastRoot />
                        <PortalHost />
                        {/* <StatusBar  barStyle={"dark-content"} backgroundColor={'transparent'}/> */}
                      </BottomSheetModalProvider>
                    </KeyboardProvider>
                  </GestureHandlerRootView>
                </SafeAreaProvider>
              </CustomPaletteWrapper>
            </ThemeProvider>
          </LocaleProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </PostHogProvider>
  );
}
