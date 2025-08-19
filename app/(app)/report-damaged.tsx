import {Button, Header, ProgressBar, Radio, Typography} from '@/components'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {router} from 'expo-router'
import {useCallback, useState} from 'react'
import {TouchableOpacity, View} from 'react-native'

export const ReportLostOrDamagedScreen = () => {
  const [reportType, setReportType] = useState<string>('')

  const handleContinue = useCallback(() => {
    if (reportType === 'lost') {
      router.push({
        pathname: '/lost',
      })
    } else {
      router.push({
        pathname: '/damaged',
      })
    }
  }, [reportType])

  const handleReportType = (type: string) => {
    setReportType(type)
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title="Report lost or damaged" />
      <ProgressBar completeAnimation={true} />
      <View style={tw`flex-1 pt-sp16`}>
        <View style={tw`flex-1 px-sp24 gap-sp12`}>
          <TouchableOpacity
            onPress={handleReportType.bind(null, 'lost')}
            style={tw.style(
              `py-sp16 px-sp16 border border-[#D4D4D4] rounded-br12 gap-sp12 flex-row`,
              reportType === 'lost' && 'border-bw2 border-[#FF885D] bg-[#FFF2ED]',
            )}>
            <Radio selected={reportType === 'lost' ? true : false} />
            <View style={tw`gap-sp4 flex-1`}>
              <Typography weight="semibold">Lost or stolen</Typography>
              <Typography textColor="#404040" weight="regular">
                Your current card will be immediately deactivated, and we’ll send you a new one.
              </Typography>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReportType.bind(null, 'damaged')}
            style={tw.style(
              `py-sp16 px-sp16 border border-[#D4D4D4] rounded-br12 gap-sp12 flex-row`,
              reportType === 'damaged' && 'border-bw2 border-[#FF885D] bg-[#FFF2ED]',
            )}>
            <Radio selected={reportType === 'damaged' ? true : false} />
            <View style={tw`gap-sp4 flex-1`}>
              <Typography weight="semibold">Damaged card</Typography>
              <Typography textColor="#404040" weight="regular">
                You can continue using your existing card until the new one arrives.
              </Typography>
            </View>
          </TouchableOpacity>
        </View>
        <View style={tw`px-sp16`}>
          <Button.Primary disabled={!reportType} title={'Continue'} onPress={handleContinue} />
        </View>
        <BottomIndicatorAvoidingView />
      </View>
    </View>
  )
}

export default ReportLostOrDamagedScreen
