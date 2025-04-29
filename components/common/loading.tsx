import LottieView from "lottie-react-native";
import { Modal, View } from "react-native";

export function LoadingScreen({ loading = false }: { loading: boolean }) {
  return (
    <Modal visible={loading} animationType="fade" transparent>
      <View className="flex-1 justify-center bg-background items-center">
        <LottieView
          style={{ width: 300, height: 300 }}
          source={require("@/assets/json/loader.json")}
          resizeMode="contain"
          speed={1}
          autoPlay
          loop
        />
      </View>
    </Modal>
  );
}
