import {LoadingScreen, Typography, Button} from '@/components'
import {formatDateNow, formatDateTransactionDetails} from '@/lib'
import {BottomIndicatorAvoidingView, TopIndicatorAvoidingView, formatNumber, tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {useCallback, useEffect, useState} from 'react'
import {Image, View} from 'react-native'

interface propsLocal {
  title: string
  sub: string
  icon: any
  button: string
  secondaryButton: string
}

function TransactionResultScreen() {
  const {
    success,
    amount,
    type: transType,
    transactionId,
    email,
    cardBalance,
    pointsBalance,
    totalCardBalance,
    totalPointsBalance,
    dateTransacted,
    destinationUserFullName,
  } = useLocalSearchParams()

  const isEmptyString = (str: string) => !str.trim()

  const type = [
    {
      title: `Something went wrong`,
      sub: `An unexpected error occurred while processing your request. Please try again.`,
      icon: require('@/assets/images/error-filled.png'),
      button: transType === 'load-card' ? `Load card again` : `Send points again`,
      secondaryButton: `Return to home`,
    },
    {
      title:
        transType === 'load-card'
          ? `+£${formatNumber({
              value: Number(amount?.toString().replace(/,/g, '')) * 0.1,
            })}`
          : `${amount} points`,
      sub:
        transType === 'load-card'
          ? `successfully loaded to your card.`
          : `successfully sent to ${!isEmptyString(destinationUserFullName.toString()) ? destinationUserFullName.toString() : email}.`,
      icon: require('@/assets/images/success-filled.png'),
      button: transType === 'load-card' ? `Load card again` : `Send points again`,
      secondaryButton: `Return to home`,
    },
  ]

  const [localType, setLocalType] = useState<propsLocal>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLocalType(success !== 'false' ? type[1] : type[0])
  }, [])

  const handleLoadCardAgain = useCallback(() => {
    router.dismissTo({
      pathname: '/load-card',
      params: {
        isReset: 'true',
      },
    })
  }, [])

  const handleSendPointAgain = useCallback(() => {
    router.dismissTo({
      pathname: '/send-point',
      params: {
        isReset: 'true',
      },
    })
  }, [])

  const handleReturnHome = useCallback(async () => {
    setLoading(true)

    try {
      await router.dismissAll()
    } finally {
      setLoading(false)
    }
  }, [])

  const TransRowItem = ({title, value}: {title: string; value: string}) => {
    return (
      <View key={`${title}-${value}`} style={tw`flex-row justify-between`}>
        <Typography weight="regular" style={{flex: 0.6}}>
          {title}
        </Typography>
        <Typography style={{flex: 0.4, textAlign: 'right'}}>{value}</Typography>
      </View>
    )
  }

  const TransactionCardDetail = () => {
    return (
      <View style={tw` flex-1 bg-subtle justify-start items-center`}>
        <Image style={tw`w-16 h-16`} resizeMode="contain" source={localType?.icon} />
        <Typography type="hs" weight="semibold" style={tw`mt-sp16`}>
          {localType?.title}
        </Typography>
        <Typography weight="regular" style={tw`text-center mt-sp8`}>
          {localType?.sub}
        </Typography>
        <Typography weight="regular" style={tw`text-center mt-sp24`}>
          {formatDateNow()}
        </Typography>

        <View style={tw`mt-sp32 w-full border border-border2 rounded-br12 px-sp16 py-sp24 gap-sp8 bg-white`}>
          <TransRowItem title="Reference number" value={transactionId.toString()} />
          <TransRowItem title="You loaded" value={`${amount} points`} />
          <TransRowItem title="Conversion rate" value="1 point = £0.1" />

          <View style={tw`h-h1 bg-border my-sp8`} />

          <Typography type="bd" weight="semibold">
            Account balances
          </Typography>
          <TransRowItem title="Points" value={`${totalPointsBalance} points`} />
          <TransRowItem title="Card" value={`£${totalCardBalance}`} />
        </View>
      </View>
    )
  }

  const TransactionPointDetail = () => {
    return (
      <View style={tw` flex-1 bg-subtle justify-start items-center`}>
        <Image style={tw`w-16 h-16`} resizeMode="contain" source={localType?.icon} />
        <Typography type="hs" weight="semibold" style={tw`mt-sp16`}>
          {localType?.title}
        </Typography>
        <Typography weight="regular" style={tw`text-center mt-sp8`}>
          {localType?.sub}
        </Typography>
        <Typography weight="regular" style={tw`text-center mt-sp16`}>
          {formatDateTransactionDetails(dateTransacted?.toString())}
        </Typography>

        <View style={tw`mt-sp24 w-full border border-border2 rounded-br12 px-sp16 py-sp24 gap-sp8 bg-white`}>
          <TransRowItem title="Reference number" value={transactionId?.toString()} />
          <TransRowItem title="You sent" value={`${amount} points`} />

          <View style={tw`h-h1 bg-border my-sp8`} />

          <Typography type="bd" weight="semibold">
            Recipient details
          </Typography>
          {destinationUserFullName && <TransRowItem title="Account holder" value={destinationUserFullName.toString()} />}
          {email && <TransRowItem title="Email address" value={email.toString()} />}

          {(destinationUserFullName || email) && <View style={tw`h-h1 bg-border my-sp8`} />}

          <Typography type="bd" weight="semibold">
            Account balances
          </Typography>
          <TransRowItem title="Points" value={`${pointsBalance} points`} />
          <TransRowItem
            title="Card"
            value={`£${formatNumber({
              value: cardBalance?.toString(),
            })}`}
          />
        </View>
      </View>
    )
  }

  const ButtonSection = () => {
    return (
      <View style={tw`gap-sp16`}>
        <Button.Primary
          title={localType?.button}
          isLoading={loading}
          onPress={transType === 'load-card' ? handleLoadCardAgain : handleSendPointAgain}
        />
        <Button.Secondary title={localType?.secondaryButton} onPress={handleReturnHome} />
      </View>
    )
  }

  if (success === 'false') {
    return (
      <View style={tw`flex-1 bg-white p-sp12`}>
        <LoadingScreen loading={loading} />
        <TopIndicatorAvoidingView number={1.5} />
        <View style={tw`flex-1 justify-start items-center`}>
          <Image style={tw`w-16 h-16`} resizeMode="contain" source={localType?.icon} />
          <Typography type="hs" weight="semibold" style={tw`mt-sp16`}>
            {localType?.title}
          </Typography>
          <Typography weight="regular" style={tw`text-center mt-sp8 mx-2`}>
            {localType?.sub}
          </Typography>
        </View>
        <ButtonSection />
        <BottomIndicatorAvoidingView />
      </View>
    )
  }

  return (
    <View style={tw`flex-1 bg-subtle p-sp12`}>
      <LoadingScreen loading={loading} />
      <TopIndicatorAvoidingView number={1.5} />
      {transType === 'load-card' ? <TransactionCardDetail /> : <TransactionPointDetail />}
      <ButtonSection />
      <BottomIndicatorAvoidingView />
    </View>
  )
}
export default TransactionResultScreen
