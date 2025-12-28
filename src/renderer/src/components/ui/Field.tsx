import { twMerge } from 'tailwind-merge'

type FieldProps = {
  children: React.ReactNode
  className?: string
}

export const Field = ({ children, className }: FieldProps) => {
  return (
    <div
      className={twMerge(
        'relative flex w-full flex-col gap-2 pb-2 text-lg',
        className,
      )}
    >
      {children}
    </div>
  )
}
