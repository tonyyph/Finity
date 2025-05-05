import TransactionTab from "@/components/home/transaction_tab";
import Header from "@/components/ui/header";
import { Progress } from "@/components/ui/progress";
import { router } from "expo-router";
import { View } from "react-native";

function TransactionsScreen() {
  return (
    <View className="flex-1 bg-white">
      <Header onBack={router.back} title="Transactions" />
      <Progress
        value={100}
        className="h-[1px] mt-4 mb-2 bg-border"
        indicatorClassName="bg-orange-primary"
      />
      <TransactionTab />
    </View>
  );
}
export default TransactionsScreen;
