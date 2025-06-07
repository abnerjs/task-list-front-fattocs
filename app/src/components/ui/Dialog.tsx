import * as DialogPrimitive from '@radix-ui/react-dialog'
import styled from 'styled-components'

const DialogContentStyle = styled(DialogPrimitive.DialogContent)`
  transition: all ease 250ms;
  &[data-state='open'] {
    opacity: 1;
    transform: translate(0);
  }
  &[data-state='closed'] {
    opacity: 0;
    transform: translate(-300px);
  }
`

const Dialog = (props: DialogPrimitive.DialogProps) => {
  return <DialogPrimitive.Dialog {...props} />
}

export const DialogTrigger = (props: DialogPrimitive.DialogTriggerProps) => {
  return <DialogPrimitive.DialogTrigger {...props} />
}

export const DialogClose = (props: DialogPrimitive.DialogCloseProps) => {
  return <DialogPrimitive.DialogClose {...props} />
}

export const DialogPortal = (props: DialogPrimitive.DialogPortalProps) => {
  return <DialogPrimitive.DialogPortal {...props} />
}

export const DialogOverlay = (props: DialogPrimitive.DialogOverlayProps) => {
  return (
    <DialogPrimitive.DialogOverlay
      {...props}
      className='fixed inset-0 z-40 bg-black/40 backdrop-blur-sm'
    />
  )
}

export const DialogContent = (props: DialogPrimitive.DialogContentProps) => {
  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogContentStyle
        {...props}
        className='fixed z-50 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-8'
      />
    </DialogPortal>
  )
}

export const DialogTitle = (props: DialogPrimitive.DialogTitleProps) => {
  return (
    <DialogPrimitive.DialogTitle {...props} className='text-lg font-semibold' />
  )
}

export const DialogDescription = (
  props: DialogPrimitive.DialogDescriptionProps
) => {
  return (
    <DialogPrimitive.DialogDescription
      {...props}
      className='text-zinc-400 text-sm leading-relaxed'
    />
  )
}

export default Dialog
