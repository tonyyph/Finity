import LottieView from "lottie-react-native";
import { useState } from "react";
import { Modal, View } from "react-native";

export function SplashAnimationScreen() {
  const [loading, setLoading] = useState(true);
  const onCloseSplash = () => {
    setLoading(false);
  };

  return (
    <Modal visible={loading} animationType="fade" transparent>
      <View className="flex-1 justify-center bg-black items-center">
        <LottieView
          style={{ width: "100%", height: "100%" }}
          source={require("@/assets/json/splash_lottie.json")}
          resizeMode="contain"
          speed={1}
          autoPlay
          loop={false}
          onAnimationFinish={onCloseSplash}
        />
      </View>
    </Modal>
  );
}
