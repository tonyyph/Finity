import { ToastRoot } from "@/components/common/toast";
import { SplashAnimationScreen } from "@/components/ui/splash";
import { tokenCache } from "@/lib/cache";
import { queryClient } from "@/lib/client";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import { cssInterop } from "nativewind";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Svg from "react-native-svg";
import "../global.css";
import { CustomPaletteWrapper } from "@/components/common/custom-palate-wrapper";
import { NetworkProvider } from "@/stores/core/network-provider";
import { StoreProvider } from "@/stores/core/store-provider";
import { LoadingProvider } from "@/stores";
import { StatusBar } from "expo-status-bar";
import { IS_ANDROID } from "@/lib/utils";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage
});

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
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    "NeueMontreal-Regular": require("../assets/fonts/ppneuemontreal-book.otf"),
    "NeueMontreal-Medium": require("../assets/fonts/ppneuemontreal-medium.otf"),
    "NeueMontreal-SemiBold": require("../assets/fonts/ppneuemontreal-semibolditalic.otf"),
    "NeueMontreal-Bold": require("../assets/fonts/ppneuemontreal-bold.otf")
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timeOut = setTimeout(() => {
        setLoading(false);
        SplashScreen.hideAsync();
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || loading) {
    return (
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <ClerkLoaded>
          <SplashAnimationScreen />
        </ClerkLoaded>
      </ClerkProvider>
    );
  }

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: asyncStoragePersister }}
        >
          <StoreProvider>
            <LoadingProvider>
              <ThemeProvider value={DefaultTheme}>
                <CustomPaletteWrapper>
                  <NetworkProvider>
                    <SafeAreaProvider>
                      <GestureHandlerRootView>
                        <KeyboardProvider>
                          {IS_ANDROID && <StatusBar style="auto" />}
                          <BottomSheetModalProvider>
                            <Stack screenOptions={{ headerShown: false }} />
                            <ToastRoot />
                          </BottomSheetModalProvider>
                        </KeyboardProvider>
                      </GestureHandlerRootView>
                    </SafeAreaProvider>
                  </NetworkProvider>
                </CustomPaletteWrapper>
              </ThemeProvider>
            </LoadingProvider>
          </StoreProvider>
        </PersistQueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
