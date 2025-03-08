import LottieView from "lottie-react-native";
import { Modal, View } from "react-native";

export function LoadingScreen({ loading = false }: { loading: boolean }) {
  return (
    <Modal visible={loading} animationType="fade" transparent>
      <View className="flex-1 justify-center bg-background items-center">
        <LottieView
          style={{ width: 280, height: 280 }}
          source={require("@/assets/json/loader.json")}
          resizeMode="contain"
          speed={0.75}
          autoPlay
          loop
        />
      </View>
    </Modal>
  );
}
