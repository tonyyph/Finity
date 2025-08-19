import {Separator, Text} from '@/components'
import {tw} from '@/utils'
import * as Linking from 'expo-linking'
import {ScrollView, View} from 'react-native'

export default function LoginErrorScreen() {
  return (
    <ScrollView style={tw`bg-white`} contentContainerStyle={tw`px-sp16 py-sp12 gap-sp8`}>
      <Text>
        Hey there! Thanks for using Finity. Here's the lowdown on what data we collect, how we use it, and how we keep it safe. We aim to be as
        transparent as possible, so let's dive in!
      </Text>

      <Text style={tw`mt-sp8 font-semiBold text-xl`}>What Info We Collect</Text>
      <Text>To get you up and running, we collect some basic information:</Text>
      <View style={tw`gap-sp8 px-sp8`}>
        <Text>✳︎ Email address</Text>
        <Text>✳︎ Profile picture</Text>
      </View>

      <Text style={tw`mt-sp8 font-semiBold text-xl`}>How We Use Your Info</Text>
      <Text>We use the collected info to make sure everything runs smoothly. Here's how:</Text>
      <View style={tw`gap-sp8 px-sp8`}>
        <Text>✳︎ Your email and avatar help us authenticate and identify you.</Text>
        <Text>
          ✳︎ We share your user identity with Sentry for crash reporting and with Posthog for product analytics. This helps us make the app better for
          you and everyone else.
        </Text>
      </View>

      <Text style={tw`mt-sp8 font-semiBold text-xl`}>No Sharing of Transaction Records</Text>
      <Text>Rest assured, your transaction records stay with us. We don't share them with any third-party services.</Text>

      <Text style={tw`mt-sp8 font-semiBold text-xl`}>Future Plans: End-to-End Encryption</Text>
      <Text>
        We're all about keeping your data secure. We're planning to implement end-to-end encryption soon to make sure your information is even safer.
      </Text>

      <Text style={tw`mt-sp8 font-semiBold text-xl`}>Data Security</Text>
      <Text>
        We take data security seriously and use various measures to protect your info. However, keep in mind that no method of transmission over the
        Internet or electronic storage is 100% secure. But we're doing our best!
      </Text>

      <Text style={tw`mt-sp8 font-semiBold text-xl`}>Contact Us</Text>
      <Text>Got any questions or concerns? Feel free to reach out to us at:</Text>
      <Text>
        Email:{' '}
        <Text style={tw`text-primary`} onPress={() => Linking.openURL('mailto:support@Finity.com')}>
          support@Finity.com
        </Text>
      </Text>
      <Separator style={tw`mx-auto my-sp12 w-[70%]`} />
      <Text style={tw`text-center text-black`}>Last updated: 10/02/2025</Text>
    </ScrollView>
  )
}
