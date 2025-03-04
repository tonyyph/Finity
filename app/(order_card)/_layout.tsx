import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(order_card)" options={{}} />
      <Stack.Screen name="index" />
      <Stack.Screen name="order_card_success" />
    </Stack>
  );
}
