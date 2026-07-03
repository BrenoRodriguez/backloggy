import { DropdownMenu, NavLink } from '@/components'
import { AvatarProfile } from '@/components/ui/ProfileAvatar'
import { logout } from '@/features/auth/actions'
import { AuthView } from '@/features/auth/components'
import { Bell, Menu } from 'lucide-react'

export async function Header() {
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
  return (
    <header>
      <nav className='flex items-center justify-between px-16 py-2'>
        <NavLink
          className='font-medium text-3xl first-letter:text-accent-normal hover:text-white'
          shouldColorWhenActive={false}
          href='/'
          variant='title'
        >
          Backlogg<span className='text-accent-normal'>y</span>
        </NavLink>
        <div className='flex gap-6 place-self-center'>
          <NavLink href='/games'>Games</NavLink>
          <NavLink href='/backlog' disabled={true}>
            Backlog
          </NavLink>
          <NavLink href='/wishlist' disabled={true}>
            Wishlist
          </NavLink>
          <NavLink href='/lists' disabled={true}>
            Lists
          </NavLink>
          <NavLink href='/reviews' disabled={true}>
            Reviews
          </NavLink>
          <NavLink href='/stats' disabled={true}>
            Stats
          </NavLink>
        </div>
        <div className='flex items-center gap-6'>
          <AuthView
            visitorView={
              <>
                <NavLink href='/register'>Register</NavLink>
                <NavLink href='/login'>Login</NavLink>
              </>
            }
          >
            <Bell />
            <DropdownMenu options={DROPDOWN_ITEMS}>
              <AvatarProfile />
            </DropdownMenu>
            <Menu className='sm:hidden' />
          </AuthView>
        </div>
      </nav>
    </header>
  )
}
//    <NavBar />
