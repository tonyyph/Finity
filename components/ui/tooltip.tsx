import {tw} from '@/utils'
import React, {ReactNode, useCallback, useEffect, useState} from 'react'
import {TouchableOpacity, TouchableOpacityProps} from 'react-native'
import Tooltips from 'react-native-walkthrough-tooltip'
import {Text} from './text'

type Props = {
  tootTipContent?: ReactNode
  content?: string
}

export const Tooltip: React.FC<TouchableOpacityProps & Props> = props => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  let timeout: any = null

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [timeout])

  const handleToolTip = useCallback(() => {
    setShowTooltip(!showTooltip)
    if (!showTooltip) {
      timeout = setTimeout(() => {
        setShowTooltip(false)
      }, 5000)
    }
  }, [showTooltip])
  return (
    <Tooltips
      isVisible={showTooltip}
      content={props?.tootTipContent ? <>{props.tootTipContent}</> : <Text style={tw`text-white text-bs`}>{props.content ?? 'Check this out!'}</Text>}
      backgroundColor="transparent"
      contentStyle={tw`rounded-br8 bg-neutral`}
      placement="bottom"
      onClose={() => {
        setShowTooltip(false)
      }}>
      <TouchableOpacity {...props} onPress={handleToolTip} activeOpacity={1}>
        {props.children}
      </TouchableOpacity>
    </Tooltips>
  )
}
export default Tooltip
