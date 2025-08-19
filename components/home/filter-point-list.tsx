import {useEffect, useState} from 'react'
import {FlatList, Pressable, View} from 'react-native'
import {CheckBoxIcon, Typography, UnCheckBoxIcon} from '../common'
import {tw} from '@/utils'

type FilterItem = {
  id: string
  label: string
  checked: boolean
  value: string
}

const initialFilters: FilterItem[] = [
  {id: '1', label: 'Accrual', checked: false, value: 'Accrual'},
  {id: '2', label: 'Card load', checked: false, value: 'Card Load'},
  {
    id: '3',
    label: 'Points received',
    checked: false,
    value: 'Points Received',
  },
  {id: '4', label: 'Points sent', checked: false, value: 'Points Sent'},
]

type FilterListProps = {
  onChange: (selectedValues: string[]) => void
  selectedFilterTypes: string[]
}

export const FilterPointList = ({onChange, selectedFilterTypes}: FilterListProps) => {
  const [filters, setFilters] = useState<FilterItem[]>([])
  useEffect(() => {
    const updatedFilters = initialFilters.map(item => ({
      ...item,
      checked: selectedFilterTypes.includes(item.value),
    }))
    setFilters(updatedFilters)
  }, [selectedFilterTypes])

  const toggleCheck = (id: string) => {
    const newFilters = filters.map(item => (item.id === id ? {...item, checked: !item.checked} : item))
    setFilters(newFilters)
    const selected = newFilters.filter(f => f.checked).map(f => f.value)
    onChange(selected) // notify parent
  }

  const renderItem = ({item}: {item: FilterItem}) => (
    <Pressable onPress={() => toggleCheck(item.id)} style={tw`flex-row items-center px-sp16 py-sp12 gap-sp12 my-sp8`}>
      {item.checked ? <CheckBoxIcon /> : <UnCheckBoxIcon />}
      <Typography>{item.label}</Typography>
    </Pressable>
  )

  return (
    <View style={tw`my-sp12 flex-1 mx-sp16`}>
      <FlatList
        data={filters}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 16}}
        ItemSeparatorComponent={() => <View style={tw`h-h1 bg-[#E5E5E5]`} />}
      />
    </View>
  )
}
