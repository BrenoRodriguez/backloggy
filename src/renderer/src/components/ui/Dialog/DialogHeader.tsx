import { X } from 'lucide-react'

type DialogHeaderProps = {
  title: string
  onClose: () => void
}

export const DialogHeader = ({ title, onClose }: DialogHeaderProps) => {
  return (
    <div className='flex items-start justify-between pb-8 font-medium text-2xl uppercase'>
      {title}
      <button
        type='button'
        onClick={onClose}
        className='cursor-pointer transition-colors duration-200 ease-in hover:text-accent-light'
      >
        <X size={32} />
      </button>
    </div>
  )
}
