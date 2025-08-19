import {TopIndicatorAvoidingView, tw} from '@/utils'
import React from 'react'
import {View} from 'react-native'
import {Skeleton} from '../ui/skeleton'

export function HomeSkeleton() {
  return (
    <View style={tw`flex-1 mx-sp16`}>
      <TopIndicatorAvoidingView />
      <Skeleton style={tw`my-sp20 h-h24 w-w80 rounded-full`} />

      <Skeleton style={tw`h-h240 w-full rounded-br12 p-sp12 my-sp16`} />
      {React.Children.toArray(
        [1, 2, 3].map(i => (
          <View style={tw`flex-row gap-sp8`}>
            <Skeleton style={tw`mt-sp12 mb-sp20 w-w40 h-h40 rounded-full`} />
            <Skeleton style={tw`mt-sp12 mb-sp20 h-h40 w-[90%] rounded-br12`} />
          </View>
        )),
      )}
    </View>
  )
}
