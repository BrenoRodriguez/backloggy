'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  type GameSearchSettingsData,
  GameSearchSettingsSchema,
} from '../schema/search-settings'

export function GameSearchSettings() {
  const { register } = useForm<GameSearchSettingsData>({
    resolver: zodResolver(GameSearchSettingsSchema),
    mode: 'onBlur',
  })

  return (
    <form className='w-full max-w-130 pb-8'>
      <div className='flex w-full max-w-130 rounded-sm'>
        <input
          {...register('query')}
          type='text'
          className='w-full rounded-l-sm border border-neutral-800 bg-foreground px-4 py-1.5 text-lg transition-colors duration-150 ease-in hover:border-accent-light focus:border-accent-light focus:bg-neutral-900/20 focus:outline-none'
          placeholder='Search games...'
        />
        <button
          type='submit'
          className='group flex w-14 cursor-pointer items-center justify-center rounded-r-sm bg-accent-normal transition-colors duration-150 ease-in hover:bg-accent-light'
        >
          <Search
            size={22}
            strokeWidth={3}
            className='transition-all duration-300 ease-in-out group-hover:size-6'
          />
        </button>
      </div>
    </form>
  )
}
