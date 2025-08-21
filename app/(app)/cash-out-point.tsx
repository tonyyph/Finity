import {Typography} from '@/components/common/text-typography'
import {Button} from '@/components/ui/button'
import {Header} from '@/components/ui/header'
import {ProgressBar} from '@/components/ui/progress'
import {useCardHolder} from '@/hooks/cardholders/useCardHolder'
import {SUPPORT_URL} from '@/lib'
import {formatNumber, tw} from '@/utils'
import {router} from 'expo-router'
import {Linking, TextInput, View} from 'react-native'

export default function CashOutPointScreen() {
  const {userData, loading} = useCardHolder()

  const handleSendEmail = async () => {
    const email = 'support@finity.co.uk'
    const subject = 'Request cash out'
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`

    const canOpen = await Linking.canOpenURL(mailtoUrl)
    if (canOpen) {
      Linking.openURL(mailtoUrl)
    } else {
      router.push({
        pathname: '/web-view',
        params: {
          title: '',
          webLink: SUPPORT_URL,
        },
      })
    }
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title="Cash out points" />

      <ProgressBar completeAnimation={!loading} />
      <View style={tw`p-sp24 gap-sp16`}>
        <Typography weight="regular">
          {`You may cash out your points at a rate of `}
          <Typography>1 point = £0.001.</Typography>
        </Typography>
        <View style={tw`gap-sp4`}>
          <Typography type="bd" weight="medium" textColor="#404040">
            {`Points balance`}
          </Typography>
          <TextInput
            editable={false}
            value={`${formatNumber({value: Number(userData?.pointsBalance ?? 0), decimalCount: 0})}`}
            style={tw`bg-neutral-100 rounded-br8 h-h48 border-bw1 border-border2 px-sp12 text-bl font-bold text-[#404040]`}
          />
        </View>
        <View style={tw`justify-end py-sp12`}>
          <Button.Primary title={`Request cash out`} disabled={loading} onPress={handleSendEmail} />
        </View>
      </View>
    </View>
  )
}
