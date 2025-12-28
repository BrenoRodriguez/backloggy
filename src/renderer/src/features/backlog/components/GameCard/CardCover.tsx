import { Edit } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { useGameCard } from '../../context'
import { Link } from '@tanstack/react-router'

export const CardCover = () => {
  const { cover, name, id } = useGameCard()

  return (
    <div className='group relative h-[300px] w-[200px]'>
      <img
        className='size-full rounded-l-sm object-cover'
        src={cover}
        alt={`${name} game cover`}
      />
      <Link to='/backlog/edit/$gameId' params={{ gameId: `${id}` }}>
        <Edit
          className={twJoin(
            'absolute top-0 right-0 hidden cursor-pointer',
            'text-stone-500 transition-all duration-200',
            'ease-in hover:text-accent-normal group-hover:inline',
          )}
          size={30}
        />
      </Link>
    </div>
  )
}
