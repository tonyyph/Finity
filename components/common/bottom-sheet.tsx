/* eslint-disable react/display-name */
import {tw} from '@/utils'
import {BottomSheetBackdrop, type BottomSheetBackdropProps, BottomSheetModal, type BottomSheetModalProps} from '@gorhom/bottom-sheet'
import type {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types'
import {forwardRef, useCallback} from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import {FullWindowOverlay} from 'react-native-screens'

export const BottomSheet = forwardRef<BottomSheetModalMethods, BottomSheetModalProps>((props, ref) => {
  const backdropComponent = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} enableTouchThrough />,
    [],
  )

  const containerComponent = useCallback((props: {children?: React.ReactNode}) => <View style={styles.androidContainer}>{props.children}</View>, [])

  const iOSContainerComponent = useCallback((props: {children?: React.ReactNode}) => <FullWindowOverlay>{props.children}</FullWindowOverlay>, [])

  const handleComponent = () => {
    return <View style={tw`flex-1 overflow-hidden h-h2 rounded-br16`} />
  }

  return (
    <BottomSheetModal
      ref={ref}
      handleComponent={handleComponent}
      backdropComponent={backdropComponent}
      containerComponent={Platform.OS === 'ios' ? iOSContainerComponent : containerComponent}
      keyboardBehavior="extend"
      enablePanDownToClose
      enableDismissOnClose
      {...props}
    />
  )
})

const styles = StyleSheet.create({
  androidContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    pointerEvents: 'box-none', // or 'auto' depending on interaction needs
  },
})
