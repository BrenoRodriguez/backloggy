import { Route as rootRoute } from '../../routes/__root'
import { Route as backlogRoute } from '../../routes/backlog'
import { Route as settingsRoute } from '../../routes/settings'
import { NavLink } from '../ui'

export const NavBar = () => {
  return (
    <nav className='flex gap-4 text-xl'>
      <NavLink to={rootRoute.to} activeAppearance='navbar'>
        Home
      </NavLink>
      <NavLink to={backlogRoute.to} activeAppearance='navbar'>
        Backlog
      </NavLink>
      <NavLink to={settingsRoute.to} activeAppearance='navbar'>
        Settings
      </NavLink>
    </nav>
  )
}

/*
<NavLink to='/' activeAppearance='navbar'>
  Stats
</NavLink>
<NavLink to='/lists' activeAppearance='navbar'>
  Lists
</NavLink>
*/
