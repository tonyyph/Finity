import { Typography } from "@/components/common/text-typography";
import { Header } from "@/components/ui/header";
import { formatDateTransactionDetails } from "@/lib/date";
import { formatNumber } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

function TransactionCardDetail() {
  const { item, transactionId } = useLocalSearchParams();
  const data = JSON.parse(item as string);

  const renderContent = (type: string) => {
    switch (type) {
      case "Load":
        return <CardLoad />;
      case "Payment":
        return <Payment />;
      case "Refund":
        return <Refund />;
      case "Declined":
        return <Declined />;
      default:
        return <Payment />;
    }
  };

  const CardLoad = () => {
    return (
      <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
        <Typography weight="regular" textColor="#404040">
          {`You loaded`}
        </Typography>
        <Typography>
          {Math.abs(Number(data?.amount) * 10) + " points"}
        </Typography>
        <Typography weight="regular" textColor="#404040" className="mt-4">
          {`Amount equivalent`}
        </Typography>
        <Typography>{`£${formatNumber({
          value: Number(
            Math.abs(Number(data?.amount)).toString().replace(/,/g, "")
          )
        })}`}</Typography>

        <View className=" h-[1px] bg-[#E5E5E5] my-4" />
        <Typography weight="regular" textColor="#404040">
          Reference number
        </Typography>
        <Typography className="mb-2">{transactionId?.toString()}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>{formatDateTransactionDetails(data?.date)}</Typography>
      </View>
    );
  };

  const Payment = () => {
    return (
      <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
        {data?.source && (
          <>
            <Typography weight="regular" textColor="#404040">
              {`Merchant name`}
            </Typography>
            <Typography>{data?.source}</Typography>
          </>
        )}
        <Typography weight="regular" textColor="#404040" className="mt-4">
          {`Payment`}
        </Typography>
        <Typography>{`£${formatNumber({
          value: Number(
            Math.abs(Number(data?.amount)).toString().replace(/,/g, "")
          )
        })}`}</Typography>

        <View className=" h-[1px] bg-[#E5E5E5] my-4" />
        <Typography weight="regular" textColor="#404040">
          Reference number
        </Typography>
        <Typography className="mb-2">{transactionId.toString()}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>{formatDateTransactionDetails(data?.date)}</Typography>
      </View>
    );
  };

  const Declined = () => {
    return (
      <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
        {data?.source && (
          <>
            <Typography weight="regular" textColor="#404040">
              {`Merchant name`}
            </Typography>
            <Typography>{data?.source}</Typography>
          </>
        )}
        <Typography weight="regular" textColor="#404040" className="mt-4">
          {`Payment`}
        </Typography>
        <Typography>{`Declined`}</Typography>

        <View className=" h-[1px] bg-[#E5E5E5] my-4" />
        <Typography weight="regular" textColor="#404040">
          Reference number
        </Typography>
        <Typography className="mb-2">{transactionId.toString()}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>{formatDateTransactionDetails(data?.date)}</Typography>
      </View>
    );
  };

  const Refund = () => {
    return (
      <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
        {data?.source && (
          <>
            <Typography weight="regular" textColor="#404040">
              {`Merchant name`}
            </Typography>
            <Typography>{data?.source}</Typography>
          </>
        )}
        <Typography weight="regular" textColor="#404040" className="mt-4">
          {`Refund`}
        </Typography>
        <Typography>{`£${formatNumber({
          value:
            Number(
              Math.abs(Number(data?.amount)).toString().replace(/,/g, "")
            ) * 0.1
        })}`}</Typography>

        <View className=" h-[1px] bg-[#E5E5E5] my-4" />
        <Typography weight="regular" textColor="#404040">
          Reference number
        </Typography>
        <Typography className="mb-2">{transactionId.toString()}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>{formatDateTransactionDetails(data?.date)}</Typography>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Header onRightFunction={router.back} title="" />
      <View className="flex-1 bg-white mx-4 mt-4">
        <Typography type="heading-small" weight="semibold" className="mx-2">
          Transaction details
        </Typography>
        {renderContent(data?.type)}
      </View>
    </View>
  );
}
export default TransactionCardDetail;
