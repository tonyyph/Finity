import { TransHisSkeleton, Typography, Header } from "@/components";
import { useTransaction } from "@/hooks";
import { formatDateTransactionDetails } from "@/lib";
import { formatNumber } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import { isEmpty } from "lodash-es";
import { useEffect } from "react";
import { View } from "react-native";

function TransactionPointDetail() {
  const { item, transactionId, referenceNumber } = useLocalSearchParams();
  const { getTransactionDetailInfo, transDetailInfo } = useTransaction();
  const data = JSON.parse(item as string);

  useEffect(() => {
    getTransactionDetailInfo({ transId: Number(transactionId as string) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = (type: string) => {
    switch (type) {
      case "Points Received":
        return <PointReceived />;
      case "Points Sent":
        return <PointSent />;
      case "Card Load":
        return <CardLoad />;
      case "Payment":
        return <Payment />;
      case "Refund":
        return <Refund />;
      case "Declined":
        return <Declined />;
      default:
        return <OtherLoad />;
    }
  };

  const PointReceived = () => {
    return (
      <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
        <Typography weight="regular" textColor="#404040">
          {data?.type}
        </Typography>
        <Typography>{Math.abs(Number(data?.amount)) + " points"}</Typography>
        <View className=" h-[1px] bg-[#E5E5E5] my-4" />
        <Typography weight="semibold" className="mb-2">
          Sender details
        </Typography>
        <Typography weight="regular" textColor="#404040" className="mt-4">
          Email address
        </Typography>
        <Typography>{data?.source}</Typography>
        <View className=" h-[1px] bg-[#E5E5E5] my-4" />
        <Typography weight="regular" textColor="#404040">
          Reference number
        </Typography>
        <Typography className="mb-2">{transactionId.toString()}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>
          {formatDateTransactionDetails(transDetailInfo?.dateTransacted)}
        </Typography>
      </View>
    );
  };
  const CardLoad = () => {
    return (
      <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
        <Typography weight="regular" textColor="#404040">
          {`You loaded`}
        </Typography>
        <Typography>{Math.abs(Number(data?.amount)) + " points"}</Typography>
        <Typography weight="regular" textColor="#404040" className="mt-4">
          {`Amount equivalent`}
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
        <Typography className="mb-2">{referenceNumber?.toString()}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>
          {formatDateTransactionDetails(transDetailInfo?.dateTransacted)}
        </Typography>
      </View>
    );
  };

  const OtherLoad = () => {
    return (
      <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
        <Typography weight="regular" textColor="#404040">
          {`${data?.type}`}
        </Typography>
        <Typography>{Math.abs(Number(data?.amount)) + " points"}</Typography>

        <View className=" h-[1px] bg-[#E5E5E5] my-4" />
        <Typography weight="regular" textColor="#404040">
          Reference number
        </Typography>
        <Typography className="mb-2">{transactionId}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>
          {formatDateTransactionDetails(transDetailInfo?.dateTransacted)}
        </Typography>
      </View>
    );
  };

  const Payment = () => {
    return (
      <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
        <Typography weight="regular" textColor="#404040">
          {`Merchant name`}
        </Typography>
        <Typography>{transDetailInfo?.merchantName}</Typography>
        <Typography weight="regular" textColor="#404040" className="mt-4">
          {`Payment`}
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
        <Typography>
          {formatDateTransactionDetails(transDetailInfo?.dateTransacted)}
        </Typography>
      </View>
    );
  };

  const Declined = () => {
    return (
      <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
        <Typography weight="regular" textColor="#404040">
          {`Merchant name`}
        </Typography>
        <Typography>{transDetailInfo?.merchantName}</Typography>
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
        <Typography>
          {formatDateTransactionDetails(transDetailInfo?.dateTransacted)}
        </Typography>
      </View>
    );
  };

  const Refund = () => {
    return (
      <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
        <Typography weight="regular" textColor="#404040">
          {`Merchant name`}
        </Typography>
        <Typography>{transDetailInfo?.merchantName}</Typography>
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
        <Typography>
          {formatDateTransactionDetails(transDetailInfo?.dateTransacted)}
        </Typography>
      </View>
    );
  };
  const PointSent = () => {
    return (
      <View className="bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-6 rounded-2xl mt-6">
        <Typography weight="regular" textColor="#404040">
          {`You sent`}
        </Typography>
        <Typography>{Math.abs(Number(data?.amount)) + " points"}</Typography>
        <View className=" h-[1px] bg-[#E5E5E5] my-4" />
        <Typography weight="semibold" className="mb-2">
          Recipient details
        </Typography>
        {data?.destinationUserFullName && (
          <>
            <Typography weight="regular" textColor="#404040">
              Account holder
            </Typography>
            <Typography>{data?.destinationUserFullName}</Typography>
          </>
        )}
        {data?.source && (
          <>
            <Typography weight="regular" textColor="#404040" className="mt-4">
              Email address
            </Typography>
            <Typography>{data?.source}</Typography>
          </>
        )}
        <View className=" h-[1px] bg-[#E5E5E5] my-4" />
        <Typography weight="regular" textColor="#404040">
          Reference number
        </Typography>
        <Typography className="mb-2">{transactionId?.toString()}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>
          {formatDateTransactionDetails(transDetailInfo?.dateTransacted)}
        </Typography>
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
        {!isEmpty(transDetailInfo) ? (
          renderContent(data?.type)
        ) : (
          <TransHisSkeleton />
        )}
      </View>
    </View>
  );
}
export default TransactionPointDetail;
