import {TransactionTab, Header, ProgressBar} from '@/components'
import {tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {View} from 'react-native'

function TransactionsScreen() {
  const {initTab} = useLocalSearchParams()

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title="Transactions" />
      <ProgressBar completeAnimation={true} />

      <TransactionTab initTab={initTab === '1' ? 1 : 0} />
    </View>
  )
}
export default TransactionsScreen
