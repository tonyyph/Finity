import {tw} from '@/utils'
import {TouchableOpacity, View} from 'react-native'
import {Typography} from '../common'
import {Separator, Skeleton} from '../ui'

type ProfileItemProps = {
  title: string
  topicTitle?: string
  value: string
  value0?: string
  value1?: string
  loading?: boolean
  loadingMultiple?: boolean
  value2?: string
  showDivider?: boolean
  canEdit?: boolean
  onPress?: () => void
}
export const ProfileItem = ({
  title,
  topicTitle,
  value,
  value0,
  value1,
  value2,
  showDivider = true,
  canEdit = false,
  loading = false,
  loadingMultiple = false,
  onPress,
}: ProfileItemProps) => {
  if (loading) {
    return (
      <View>
        <View style={tw`flex-row max-h-h48 items-center w-full justify-between gap-sp8`}>
          <View style={tw`gap-sp4 flex-1`}>
            {!!title && (
              <Typography weight="regular" textColor="#404040">
                {title}
              </Typography>
            )}
            {!!topicTitle && (
              <Typography type="bl" weight="semibold" style={tw`mb-sp8`}>
                {topicTitle}
              </Typography>
            )}
            <Skeleton style={tw`h-h20 w-[60%] rounded-full my-sp4`} />
          </View>
        </View>
        {showDivider && <Separator style={tw`mt-sp12 mb-sp16`} />}
      </View>
    )
  }

  if (loadingMultiple) {
    return (
      <View>
        <View style={tw`flex-row items-center w-full justify-between gap-sp12`}>
          <View style={tw`gap-sp4 flex-1`}>
            {!!title && (
              <Typography weight="regular" textColor="#404040">
                {title}
              </Typography>
            )}
            <Skeleton style={tw`h-h20 w-[60%] rounded-full my-sp4`} />
            <Skeleton style={tw`h-h20 w-[70%] rounded-full my-sp4`} />
            <Skeleton style={tw`h-h20 w-[80%] rounded-full my-sp4`} />
            <Skeleton style={tw`h-h20 w-[90%] rounded-full my-sp4`} />
          </View>
        </View>
        {showDivider && <Separator style={tw`mt-sp12 mb-sp16`} />}
      </View>
    )
  }

  return (
    <View key={title + value}>
      <View style={tw`flex flex-1 flex-row items-center justify-between gap-sp12`}>
        <View style={tw`gap-0.5`}>
          {!!title && (
            <Typography weight="regular" textColor="#404040">
              {title}
            </Typography>
          )}
          {!!topicTitle && (
            <Typography type="bl" weight="semibold" style={tw`mb-sp8`}>
              {topicTitle}
            </Typography>
          )}
          <Typography>{value}</Typography>
          {!!value0 && <Typography>{value0 ?? ''}</Typography>}
          {!!value1 && <Typography>{value1 ?? ''}</Typography>}
          {!!value2 && <Typography>{value2 ?? ''}</Typography>}
        </View>
        {canEdit && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`rounded-full border border-[#D4D4D4] px-sp12 py-sp6 bg-white active:bg-[#E5E5E5]`}
            onPress={onPress}>
            <Typography>{`Edit`}</Typography>
          </TouchableOpacity>
        )}
      </View>
      {showDivider && <Separator style={tw`mt-sp12 mb-sp16`} />}
    </View>
  )
}
