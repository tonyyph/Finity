import TransactionTab from "@/components/home/transaction_tab";
import { Header } from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { router } from "expo-router";
import { View } from "react-native";

function TransactionsScreen() {
  return (
    <View className="flex-1 bg-white">
      <Header onBack={router.back} title="Transactions" />
      <ProgressBar completeAnimation={true} />

      <TransactionTab />
    </View>
  );
}
export default TransactionsScreen;
