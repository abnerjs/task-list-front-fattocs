import { forwardRef, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'transition flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2',

  variants: {
    size: {
      default: 'px-4 py-2.5',
      sm: 'px-3 py-1.5',
      xs: 'px-2 py-1',
    },
    variant: {
      primary: 'bg-sky-700 text-sky-50 hover:bg-sky-600 ring-sky-500',
      secondary: 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 ring-zinc-900',
      rounded: 'p-3 rounded-full ring-zinc-800 hover:bg-zinc-800',
      roundedsm: 'p-1 rounded-full ring-zinc-800 hover:bg-zinc-800',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={button({ variant, size, className })}
      />
    )
  }
)

Button.displayName = 'Button'
