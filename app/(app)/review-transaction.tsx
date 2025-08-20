import {ArrowDownIcon, Button, Header, ProgressBar, Typography} from '@/components'
import {useTransaction} from '@/hooks'
import {BottomIndicatorAvoidingView, formatNumber, tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {StyleSheet, View} from 'react-native'

function ReviewTransactionScreen() {
  const {type, amount, cardHolderName, cardHolderId, pointsBalance, cardBalance} = useLocalSearchParams()

  const isLoadCard = type === 'load-card'

  const {loadCard, loading, sendPoints} = useTransaction()

  const handleConfirmLoadCard = async () => {
    await loadCard({
      totalPointsBalance: (Number(pointsBalance) - Number(amount)).toString(),
      pointsAmount: amount.toString(),
      type: type.toString(),
      cardBalance: cardBalance?.toString(),
    })
  }

  const handleConfirmSendPoints = async () => {
    await sendPoints({
      pointsAmount: amount.toString(),
      destinationUserId: Number(cardHolderId),
      type: type.toString(),
    })
  }

  const LoadCardInfo = () => {
    return (
      <View style={tw`flex-1 pt-sp16`}>
        <View style={tw`px-sp16 gap-sp8`}>
          <View style={tw`bg-neutral-100 px-sp20 py-sp16 items-start justify-center gap-sp4 rounded-br12`}>
            <Typography type="bl" weight="semibold">
              {`Load`}
            </Typography>
            <Typography>{`${amount} points`}</Typography>
          </View>
          <View style={tw.style(`bg-white rounded-full self-center absolute p-sp6 top-[50%] z-10`, styles.arrowStyle)}>
            <ArrowDownIcon />
          </View>
          <View style={tw`bg-neutral-100 px-sp20 py-sp16 items-start justify-center gap-sp4 rounded-br12`}>
            <Typography type="bl" weight="semibold">
              {`You’ll receive`}
            </Typography>
            <Typography>
              {`£${formatNumber({
                value: Number(amount?.toString().replace(/,/g, '')) * 0.1,
              })}`}
            </Typography>
          </View>
        </View>
        {/* point balance */}
        <View style={tw`flex-row gap-sp4 items-center px-sp16 pt-2`}>
          <Typography type="bs" weight="medium" textColor="#525252">
            {`Card balance after load: £${formatNumber({
              value: Number(amount?.toString().replace(/,/g, '')) * 0.1 + Number(cardBalance?.toString().replace(/,/g, '')),
            })}`}
          </Typography>
        </View>
      </View>
    )
  }

  const SendPointInfo = () => {
    return (
      <View style={tw`flex-1 pt-sp16`}>
        <View style={tw`px-sp16 gap-sp8`}>
          <View style={tw`bg-neutral-100 px-sp20 py-sp16 items-start justify-center gap-sp4 rounded-br12`}>
            <Typography type="bl" weight="semibold">
              {`Send`}
            </Typography>
            <Typography>{`${amount} points`}</Typography>
          </View>
          <View style={tw.style(`bg-white rounded-full self-center p-sp6 z-10`, styles.arrowStyle)}>
            <ArrowDownIcon />
          </View>
          <View style={tw`bg-neutral-100 px-sp20 py-sp16 items-start justify-center gap-sp4 rounded-br12`}>
            <Typography type="bl" weight="semibold">
              {`Recipient`}
            </Typography>
            <Typography>{`${cardHolderName}`}</Typography>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>
        <Header onBack={router.back} title="Review transactions" />
        <ProgressBar completeAnimation={true} />

        {isLoadCard ? <LoadCardInfo /> : <SendPointInfo />}
        {/* Bottom */}
        <View style={tw`px-sp16`}>
          <Button.Primary
            loadingTitle={isLoadCard ? `Loading card...` : `Sending points...`}
            isLoading={loading}
            title={isLoadCard ? `Confirm and load` : `Confirm and send`}
            onPress={isLoadCard ? handleConfirmLoadCard : handleConfirmSendPoints}
          />
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  )
}
export default ReviewTransactionScreen

const styles = StyleSheet.create({
  arrowStyle: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -20}],
    backgroundColor: '#ffffff',
  },
})
