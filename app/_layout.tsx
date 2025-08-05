import { CustomPaletteWrapper } from "@/components/common/custom-palate-wrapper";
import { ToastRoot } from "@/components/common/toast";
import { SplashAnimationScreen } from "@/components/ui/splash";
import { tokenCache } from "@/lib/cache";
import { queryClient } from "@/lib/client";
import { LoadingProvider } from "@/stores";
import { NetworkProvider } from "@/stores/core/network-provider";
import { StoreProvider } from "@/stores/core/store-provider";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import { cssInterop } from "nativewind";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Svg from "react-native-svg";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { IS_ANDROID } from "@/lib/utils";
import * as Updates from "expo-updates";
import { AppState } from "react-native";
import { UpdateLoader } from "@/components/common/update-loader";

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
  const [isSplashFinished, setSplashFinished] = useState(false);
  const [fontsLoaded] = useFonts({
    "NeueMontreal-Regular": require("../assets/fonts/ppneuemontreal-book.otf"),
    "NeueMontreal-Medium": require("../assets/fonts/ppneuemontreal-medium.otf"),
    "NeueMontreal-SemiBold": require("../assets/fonts/ppneuemontreal-semibolditalic.otf"),
    "NeueMontreal-Bold": require("../assets/fonts/ppneuemontreal-bold.otf")
  });
  const [updating, setUpdating] = useState<boolean>(false);

  const checkAndForceUpdates = useCallback(async () => {
    if (__DEV__) {
      return;
    }
    setUpdating(true);
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(error);
    }
    setUpdating(false);
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      checkAndForceUpdates();

      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
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
              {!isSplashFinished ? (
                <SplashAnimationScreen
                  onAnimationFinish={() => setSplashFinished(true)}
                />
              ) : (
                <LoadingProvider>
                  <ThemeProvider value={DefaultTheme}>
                    <CustomPaletteWrapper>
                      <NetworkProvider>
                        <SafeAreaProvider>
                          <GestureHandlerRootView>
                            <KeyboardProvider>
                              {updating ? (
                                <UpdateLoader />
                              ) : (
                                <BottomSheetModalProvider>
                                  <Stack
                                    screenOptions={{ headerShown: false }}
                                  />
                                  {IS_ANDROID && <StatusBar style="dark" />}
                                  <ToastRoot />
                                </BottomSheetModalProvider>
                              )}
                            </KeyboardProvider>
                          </GestureHandlerRootView>
                        </SafeAreaProvider>
                      </NetworkProvider>
                    </CustomPaletteWrapper>
                  </ThemeProvider>
                </LoadingProvider>
              )}
            </StoreProvider>
          </PersistQueryClientProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </>
  );
}
