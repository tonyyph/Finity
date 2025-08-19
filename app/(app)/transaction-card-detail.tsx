import {Typography, Header} from '@/components'
import {formatDateTransactionDetails} from '@/lib'
import {formatNumber, tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {View} from 'react-native'

function TransactionCardDetail() {
  const {item, transactionId} = useLocalSearchParams()
  const data = JSON.parse(item as string)

  const renderContent = (type: string) => {
    switch (type) {
      case 'Load':
        return <CardLoad />
      case 'Payment':
        return <Payment />
      case 'Refund':
        return <Refund />
      case 'Declined':
        return <Declined />
      default:
        return <Payment />
    }
  }

  const CardLoad = () => {
    return (
      <View style={tw`bg-[#FAFAFA] border border-[#E5E5E5] px-sp16 py-6 rounded-br12 mt-6`}>
        <Typography weight="regular" textColor="#404040">
          {`You loaded`}
        </Typography>
        <Typography>{Math.abs(Number(data?.amount) * 10) + ' points'}</Typography>
        <Typography weight="regular" textColor="#404040" style={tw`mt-sp16`}>
          {`Amount equivalent`}
        </Typography>
        <Typography>{`£${formatNumber({
          value: Number(Math.abs(Number(data?.amount)).toString().replace(/,/g, '')),
        })}`}</Typography>

        <View style={tw` h-h1 bg-[#E5E5E5] my-sp16`} />
        <Typography weight="regular" textColor="#404040">
          Reference number
        </Typography>
        <Typography style={tw`mb-sp8`}>{transactionId?.toString()}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>{formatDateTransactionDetails(data?.date)}</Typography>
      </View>
    )
  }

  const Payment = () => {
    return (
      <View style={tw`bg-[#FAFAFA] border border-[#E5E5E5] px-sp16 py-6 rounded-br12 mt-6`}>
        {data?.source && (
          <>
            <Typography weight="regular" textColor="#404040">
              {`Merchant name`}
            </Typography>
            <Typography>{data?.source}</Typography>
          </>
        )}
        <Typography weight="regular" textColor="#404040" className={data?.source && 'mt-sp16'}>
          {`Payment`}
        </Typography>
        <Typography>{`£${formatNumber({
          value: Number(Math.abs(Number(data?.amount)).toString().replace(/,/g, '')),
        })}`}</Typography>

        <View style={tw` h-h1 bg-[#E5E5E5] my-sp16`} />
        <Typography weight="regular" textColor="#404040">
          Reference number
        </Typography>
        <Typography style={tw`mb-sp8`}>{transactionId.toString()}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>{formatDateTransactionDetails(data?.date)}</Typography>
      </View>
    )
  }

  const Declined = () => {
    return (
      <View style={tw`bg-[#FAFAFA] border border-[#E5E5E5] px-sp16 py-6 rounded-br12 mt-6`}>
        {data?.source && (
          <>
            <Typography weight="regular" textColor="#404040">
              {`Merchant name`}
            </Typography>
            <Typography>{data?.source}</Typography>
          </>
        )}
        <Typography weight="regular" textColor="#404040" style={tw`mt-sp16`}>
          {`Payment`}
        </Typography>
        <Typography>{`Declined`}</Typography>

        <View style={tw` h-h1 bg-[#E5E5E5] my-sp16`} />
        <Typography weight="regular" textColor="#404040">
          Reference number
        </Typography>
        <Typography style={tw`mb-sp8`}>{transactionId.toString()}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>{formatDateTransactionDetails(data?.date)}</Typography>
      </View>
    )
  }

  const Refund = () => {
    return (
      <View style={tw`bg-[#FAFAFA] border border-[#E5E5E5] px-sp16 py-6 rounded-br12 mt-6`}>
        {data?.source && (
          <>
            <Typography weight="regular" textColor="#404040">
              {`Merchant name`}
            </Typography>
            <Typography>{data?.source}</Typography>
          </>
        )}
        <Typography weight="regular" textColor="#404040" style={tw`mt-sp16`}>
          {`Refund`}
        </Typography>
        <Typography>{`£${formatNumber({
          value: Number(Math.abs(Number(data?.amount)).toString().replace(/,/g, '')) * 0.1,
        })}`}</Typography>

        <View style={tw`h-h1 bg-[#E5E5E5] my-sp16`} />
        <Typography weight="regular" textColor="#404040">
          Reference number
        </Typography>
        <Typography style={tw`mb-sp8`}>{transactionId.toString()}</Typography>
        <Typography weight="regular" textColor="#404040">
          Date and time
        </Typography>
        <Typography>{formatDateTransactionDetails(data?.date)}</Typography>
      </View>
    )
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onRightFunction={router.back} title="" />
      <View style={tw`flex-1 bg-white mx-sp16 mt-sp16`}>
        <Typography type="hs" weight="semibold" style={tw`mx-2`}>
          Transaction details
        </Typography>
        {renderContent(data?.type)}
      </View>
    </View>
  )
}
export default TransactionCardDetail
