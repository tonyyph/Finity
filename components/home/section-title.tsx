import {tw} from '@/utils'
import * as Haptics from 'expo-haptics'
import {Link} from 'expo-router'
import {ArrowRight} from 'lucide-react-native'
import {Text, TouchableOpacity, View} from 'react-native'

type SelectionTitleProps = {
  name: string
  href: string
}

export function SelectionTitle({name, href}: SelectionTitleProps) {
  return (
    <View style={tw`mt-sp12 mb-sp20 flex-row items-center justify-between gap-sp20 px-sp16`}>
      <Text style={tw`text-black text-3xl font-bold`}>{name}</Text>
      <Link href={href as any} asChild onPress={Haptics.selectionAsync}>
        <TouchableOpacity style={tw`h-10 w-10 rounded-full border border-border2 bg-white`}>
          <ArrowRight style={tw`size-5 text-black`} />
        </TouchableOpacity>
      </Link>
    </View>
  )
}
