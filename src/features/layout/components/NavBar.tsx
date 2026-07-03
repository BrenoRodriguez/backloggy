/** biome-ignore-all lint/correctness/useJsxKeyInIterable: <not iterating through it> */

import { DropdownMenu, NavLink } from '@/components'
import { AvatarProfile } from '@/components/ui/ProfileAvatar'
import { logout } from '@/features/auth/actions'
import { AuthView } from '@/features/auth/components'

const DROPDOWN_ITEMS: {
  label: string
  element: React.ReactNode
}[] = [
  {
    label: 'profileLink',
    element: (
      <NavLink href='/profile' shouldColorWhenActive={true}>
        Profile
      </NavLink>
    ),
  },
  {
    label: 'settingsLink',
    element: (
      <NavLink href='/settings' shouldColorWhenActive={true}>
        Settings
      </NavLink>
    ),
  },
  {
    label: 'logoutLink',
    element: (
      <button type='button' onClick={logout}>
        Logout
      </button>
    ),
  },
]

export function NavBar() {
  return (
    <nav className='hidden gap-3 sm:flex sm:items-center'>
      <AuthView
        visitorView={
          <>
            <NavLink href='/login' shouldColorWhenActive={true}>
              Login
            </NavLink>
            <NavLink href='/register' shouldColorWhenActive={true}>
              Register
            </NavLink>
            <NavLink href='/games' shouldColorWhenActive={true}>
              Games
            </NavLink>
          </>
        }
      >
        <NavLink href='/backlog' shouldColorWhenActive={true} disabled={false}>
          Backlog
        </NavLink>
        <NavLink href='/lists' shouldColorWhenActive={true} disabled={true}>
          Lists
        </NavLink>
        <NavLink href='/stats' shouldColorWhenActive={true} disabled={true}>
          Stats
        </NavLink>
        <DropdownMenu options={DROPDOWN_ITEMS}>
          <AvatarProfile />
        </DropdownMenu>
      </AuthView>
    </nav>
  )
}
