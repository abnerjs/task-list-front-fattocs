import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const OutlineButton = (props: ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      className={twMerge(
        'flex items-center px-3 py-2 gap-2 leading-none rounded-full border border-dashed border-zinc-800 text-sm text-zinc-300 hover:border-zinc-700 disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:border-yellow-500 ring-yellow-500/10 focus-visible:ring-4',
        props.className
      )}
    />
  )
}

export default OutlineButton