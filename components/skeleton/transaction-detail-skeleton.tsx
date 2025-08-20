import {View} from 'react-native'
import {Skeleton} from '../ui/skeleton'
import {tw} from '@/utils'

export function TransHisSkeleton() {
  return (
    <View style={tw`flex-1`}>
      <Skeleton style={tw`bg-[#F5F5F5] h-h260 border border-[#E5E5E5] px-sp16 py-sp24 rounded-br12 mt-sp24`} />
    </View>
  )
}
