import TransactionTab from "@/components/home/transaction_tab";
import { Header } from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

function TransactionsScreen() {
  const { initTab } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-white">
      <Header onBack={router.back} title="Transactions" />
      <ProgressBar completeAnimation={true} />

      <TransactionTab initTab={initTab === "1" ? 1 : 0} />
    </View>
  );
}
export default TransactionsScreen;
