import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '~/shadcn/utils'

export const MutedText = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
MutedText.displayName = 'MutedText'
