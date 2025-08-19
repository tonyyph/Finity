import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {Link, useNavigation} from 'expo-router'
import {EllipsisIcon} from 'lucide-react-native'
import {useEffect} from 'react'
import {ScrollView, Text, TouchableOpacity} from 'react-native'

export default function NotificationsScreen() {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link href={'/'} asChild>
          <TouchableOpacity style={tw`h-10`}>
            <EllipsisIcon style={tw`size-6 text-black`} />
          </TouchableOpacity>
        </Link>
      ),
    })
  }, [navigation])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`bg-white`} contentContainerStyle={tw`p-sp24`}>
      <Text style={tw`text-black text-base font-bold px-sp16 mb-6`}>Today, April 22</Text>
      <Text style={tw`text-black text-base font-bold px-sp16 mb-6`}>Yesterday, April 21</Text>
      <BottomIndicatorAvoidingView />
    </ScrollView>
  )
}
