type TooltipProps = {
  children: React.ReactNode
  label: string
}

export const Tooltip = ({ children, label }: TooltipProps) => {
  return (
    <div className='group relative cursor-pointer'>
      {label}
      <div
        role='tooltip'
        className='-translate-x-1/2 absolute left-1/2 mt-0.5 w-full transform cursor-text break-keep rounded-sm border border-stone-800 bg-[#191614] px-2 py-1 text-base opacity-0 transition-opacity duration-200 group-hover:opacity-100'
      >
        {children}
      </div>
    </div>
  )
}
