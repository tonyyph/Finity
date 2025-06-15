import { Typography } from "@/components/common/text-typography";
import { Header } from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  const { title, webLink } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-background">
      <Header onBack={router.back} title={String(title)} />

      <ProgressBar />

      <WebView
        source={{ uri: String(webLink) }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState
        renderLoading={() => (
          <Typography className="text-center text-primary font-bold text-[18px] mt-4">
            Loading...
          </Typography>
        )}
      />
    </View>
  );
}
