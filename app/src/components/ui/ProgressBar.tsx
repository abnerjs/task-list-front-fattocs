import * as ProgressPrimitive from '@radix-ui/react-progress'

const Progress = (props: ProgressPrimitive.ProgressProps) => {
  return (
    <ProgressPrimitive.Progress
      {...props}
      className='bg-zinc-900 rounded-full h-2'
    />
  )
}

export const ProgressIndicator = (
  props: ProgressPrimitive.ProgressIndicatorProps
) => {
  return (
    <ProgressPrimitive.Indicator
      {...props}
      className='bg-gradient-to-r to-indigo-300 from-sky-700 w-1/2 h-2 rounded-full'
    />
  )
}

export default Progress
