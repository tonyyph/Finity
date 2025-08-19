import {BottomSheet, GlobalProgressBar, Header, MenuItem, Separator, Touch, Typography} from '@/components'
import {useStatements} from '@/hooks'
import {getAvailableMonthsByYear, listOfMonths, listOfYears} from '@/lib'
import {userStore} from '@/stores'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet'
import {router, useLocalSearchParams} from 'expo-router'
import {XIcon} from 'lucide-react-native'
import {useRef, useState} from 'react'
import {FlatList, Image, Keyboard, TouchableOpacity, View} from 'react-native'

function StatementScreen() {
  const {type, title} = useLocalSearchParams()
  const sheetRef = useRef<BottomSheetModal>(null)
  const userProfile = userStore?.getState().userProfile
  const {navigateToPreview} = useStatements()

  const dateCreated = new Date(userProfile?.dateCreated || '')
  const createdYear = dateCreated.getFullYear()

  const now = new Date()
  const currentYear = String(now.getFullYear())
  const currentMonth = listOfMonths[now.getMonth()].value

  const [yearOfFilter, setYearOfFilter] = useState(currentYear)
  const [monthOfFilter, setMonthOfFilter] = useState(currentMonth)

  const validYears = listOfYears.filter(y => Number(y.value) >= createdYear)

  const validMonthIds = getAvailableMonthsByYear(dateCreated, Number(yearOfFilter), now)

  const filteredMonths = listOfMonths.filter(month => validMonthIds.includes(month.id + 1))

  const handlePress = ({id, value}: {id: number; value: string}) => {
    navigateToPreview({
      month: value,
      year: yearOfFilter,
      type: type.toString(),
    })

    sheetRef.current?.close()
  }

  const onPressYearFilter = () => {
    sheetRef.current?.present()
    Keyboard.dismiss()
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>
        <Header onBack={router.back} title={title as string} />
        <GlobalProgressBar />

        <View style={tw`flex-1 p-sp12 gap-sp8`}>
          <Typography type="bd" weight="regular">
            {`Statements are automatically generated on the first day of every month.`}
          </Typography>

          {/* Filter by year */}
          <View style={tw`flex-row justify-between items-center gap-sp12 mx-2 mt-6`}>
            <Typography type="bd" weight="medium" textColor="#404040">
              {`Filter by year`}
            </Typography>
            <Touch
              onPress={onPressYearFilter}
              style={tw`flex-1 flex-row justify-between items-center rounded-br8 z-10 border-bw1 border-subtitle px-sp12`}>
              <View style={tw`h-h48 items-center justify-center`}>
                <Typography weight="medium" type="bd">
                  {yearOfFilter}
                </Typography>
              </View>
              <Image source={require('@/assets/images/caret-down.png')} style={tw`w-w24 h-h24`} />
            </Touch>
          </View>

          {/* Month list */}
          <FlatList
            data={filteredMonths}
            keyExtractor={(item, index) => `${index}-${item.value}`}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <BottomIndicatorAvoidingView />}
            renderItem={({item, index}) => (
              <View key={`${index}-${item.value}`}>
                <MenuItem label={item.value} onPress={() => handlePress(item)} style={tw`py-sp12`} />
                {index !== filteredMonths.length - 1 && <Separator style={tw`my-sp8`} />}
              </View>
            )}
          />
        </View>

        {/* Bottom Sheet for Year Filter */}
        <BottomSheet ref={sheetRef} index={0} snapPoints={['30%']}>
          <BottomSheetView style={tw`min-h-[50%] bg-white rounded-t-br16`}>
            <View style={tw`flex-row justify-between gap-sp12 p-sp12 items-center`}>
              <View style={tw`h-h24 w-w24`} />
              <Typography type="bl" weight="semibold">
                {`Filter by year`}
              </Typography>
              <TouchableOpacity style={tw`flex-shrink items-center`} onPress={() => sheetRef.current?.close()}>
                <XIcon style={tw`h-h24 w-w24 text-black`} />
              </TouchableOpacity>
            </View>
            <View style={tw`p-sp12 my-sp12 mb-sp64`}>
              {validYears.map((item, index) => (
                <View key={`${index}-${item.value}`}>
                  <MenuItem
                    label={item.value}
                    onPress={() => {
                      setYearOfFilter(item.value)

                      const selectedYear = Number(item.value)
                      const validIds = getAvailableMonthsByYear(dateCreated, selectedYear, now)

                      const currentSelected = listOfMonths.find(m => m.value === monthOfFilter)

                      if (!currentSelected || !validIds.includes(currentSelected.id + 1)) {
                        const fallback = listOfMonths.find(m => m.id + 1 === validIds[0])
                        if (fallback) setMonthOfFilter(fallback.value)
                      }

                      sheetRef.current?.close()
                    }}
                    style={tw`py-sp12`}
                  />
                  {index !== validYears.length - 1 && <Separator style={tw`my-sp12`} />}
                </View>
              ))}
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </View>
  )
}

export default StatementScreen
