import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const Label = (props: ComponentProps<'label'>) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
    <label
      {...props}
      className={twMerge(
        'font-medium text-sm tracking-tight leading-normal',
        props.className
      )}
    />
  )
}

export default Label
