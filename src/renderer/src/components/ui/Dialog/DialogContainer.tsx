import type { ComponentProps } from 'react'

type DialogContainerProps = ComponentProps<'div'> & {
  children: React.ReactNode
}

export const DialogContainer = ({
  children,
  ...props
}: DialogContainerProps) => {
  return (
    <div className='fixed top-0 left-0 flex h-full w-full items-center justify-center bg-stone-950/60'>
      <div
        role='dialog'
        aria-modal='true'
        {...props}
        className='bg-stone-950 p-5'
      >
        {children}
      </div>
    </div>
  )
}
