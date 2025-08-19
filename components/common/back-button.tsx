import {ArrowBackIcon} from './icons'
import {useRouter} from 'expo-router'
import {Button} from '../ui/button'
import {tw} from '@/utils'

export function BackButton() {
  const router = useRouter()
  if (!router.canGoBack) {
    return null
  }
  return (
    <Button.Icon onPress={router.back} style={tw`right-sp12`}>
      <ArrowBackIcon />
    </Button.Icon>
  )
}
