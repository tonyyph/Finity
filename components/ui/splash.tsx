import { useLocalPIN } from "@/hooks/use-local-pin";
import { useSignIn } from "@clerk/clerk-expo";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Modal, View } from "react-native";

export function SplashAnimationScreen() {
  const [loading, setLoading] = useState(true);
  const { isLoaded } = useSignIn();

  const { setShouldPINLocal } = useLocalPIN();

  useEffect(() => {
    isLoaded && setShouldPINLocal(true);
  }, []);
  const onCloseSplash = () => {
    setLoading(false);
    setShouldPINLocal(true);
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
