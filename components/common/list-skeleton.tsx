import {View} from 'react-native'
import {Skeleton} from '../ui/skeleton'
import React from 'react'
import {tw} from '@/utils'

export function ListSkeleton() {
  return <View style={tw`mt-sp8`}>{React.Children.toArray([1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton style={tw`h-h78 w-[95%] my-sp8`} />))}</View>
}
