import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { PostHogProvider } from "posthog-react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LocaleProvider } from "@/locales/provider";
import { cssInterop } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import Svg from "react-native-svg";
import LottieView from "lottie-react-native";

import "../global.css";
import { CustomPaletteWrapper } from "@/components/common/custom-palette-wrapper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ToastRoot } from "@/components/common/toast";
import { PortalHost } from "@rn-primitives/portal";
import { KeyboardProvider } from "react-native-keyboard-controller";

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
      <LocaleProvider>
        <ThemeProvider value={DarkTheme}>
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
                  </BottomSheetModalProvider>
                </KeyboardProvider>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </CustomPaletteWrapper>
        </ThemeProvider>
      </LocaleProvider>
    </PostHogProvider>
  );
}
