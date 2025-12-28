import { Database, Gamepad2, Star } from 'lucide-react'
import { NavLink } from '../../../components'

export const EditGameNavBar = () => {
  return (
    <nav className='flex w-full justify-center pb-4 text-lg'>
      <NavLink
        to='/backlog/edit/$gameId'
        appearance='editGame'
        active='editGame'
        activeOptions={{ exact: true }}
      >
        <Gamepad2 size={28} strokeWidth={1.5} />
        General
      </NavLink>
      <NavLink
        to='/backlog/edit/$gameId/metadata'
        appearance='editGame'
        active='editGame'
      >
        <Database strokeWidth={1.5} />
        Metadata
      </NavLink>
      <NavLink
        to='/backlog/edit/$gameId/review'
        appearance='editGame'
        active='editGame'
      >
        <Star strokeWidth={1.5} />
        Review
      </NavLink>
    </nav>
  )
}
