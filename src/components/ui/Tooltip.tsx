import { twMerge } from 'tailwind-merge'

type TooltipProps = {
  children: React.ReactNode
  label: string
  className: string
}

export const Tooltip = ({ children, label, className }: TooltipProps) => {
  return (
    <div className={twMerge('group relative cursor-pointer', className)}>
      {label}
      <div
        role='tooltip'
        className='absolute left-1/2 mt-0.5 w-full -translate-x-1/2 transform cursor-text break-keep rounded-sm border border-stone-800 bg-[#191614] px-2 py-1 text-base opacity-0 transition-opacity duration-200 group-hover:opacity-100'
      >
        {children}
      </div>
    </div>
  )
}
