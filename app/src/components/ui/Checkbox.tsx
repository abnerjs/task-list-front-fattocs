import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Icon } from '@iconify/react'

const Checkbox = (props: CheckboxPrimitive.CheckboxProps) => {
  return (
    <CheckboxPrimitive.Checkbox
      {...props}
      className='flex items-center gap-2'
    />
  )
}

export const CheckboxIndicator = (
  props: CheckboxPrimitive.CheckboxIndicatorProps
) => {
  return (
    <>
      <CheckboxPrimitive.CheckboxIndicator {...props} />
      <Icon
        icon='fluent:radio-button-20-regular'
        className='size-4 text-zinc-600 group-data-[state=checked]:hidden'
      />
      <Icon
        icon='fluent:checkmark-circle-48-regular'
        className='size-4 text-yellow-500 hidden group-data-[state=checked]:inline'
      />
    </>
  )
}

export default Checkbox
