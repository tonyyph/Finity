import * as Slot from '@/components/primitives/slot'
import type {SlottableTextProps, TextRef} from '@/components/primitives/types'
import {tw} from '@/utils'
import * as React from 'react'
import {Text as RNText} from 'react-native'

const TextClassContext = React.createContext<string | undefined>(undefined)

const Text = React.forwardRef<TextRef, SlottableTextProps>(({className, asChild = false, ...props}, ref) => {
  const textClass = React.useContext(TextClassContext)
  const Component = asChild ? Slot.TextPrimitive : RNText
  return <Component style={tw.style(`font-rg text-bd text-black`, className, textClass)} ref={ref} {...props} />
})
Text.displayName = 'Text'

export {Text, TextClassContext}
