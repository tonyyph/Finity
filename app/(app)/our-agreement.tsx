import {MenuItem, ArrowRightIcon, ProtectIcon, TermIcon, Header, ProgressBar} from '@/components'
import {tw} from '@/utils'
import {router} from 'expo-router'
import {View} from 'react-native'

export default function OurAgreementScreen() {
  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title="Our agreements" />

      <ProgressBar completeAnimation={true} />
      <View style={tw`p-sp12`}>
        <MenuItem
          label={`Terms and conditions`}
          icon={TermIcon}
          onPress={() => {
            router.push({
              pathname: '/web-view',
              params: {
                title: 'Terms and conditions',
                pdfLink: 'https://www.finity.co.uk/wp-content/uploads/2025/05/20250506-Finity-Terms-Conditions_Corporate-Rewards.pdf',
              },
            })
          }}
          rightSection={<ArrowRightIcon />}
          style={tw`py-sp12`}
        />
        <MenuItem
          label={`Privacy policy`}
          icon={ProtectIcon}
          onPress={() => {
            router.push({
              pathname: '/web-view',
              params: {
                title: 'Privacy policy',
                webLink: 'https://www.finity.co.uk/privacy-policy/',
              },
            })
          }}
          rightSection={<ArrowRightIcon />}
          style={tw`py-sp12`}
        />
      </View>
    </View>
  )
}
