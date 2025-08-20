import * as SeparatorPrimitive from '@/components/primitives/separator'
import {cn} from '@/lib'
import * as React from 'react'

const Separator = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>>(
  ({className, orientation = 'horizontal', decorative = true, ...props}, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-h1 w-full' : 'h-full w-w1', className)}
      {...props}
    />
  ),
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export {Separator}
