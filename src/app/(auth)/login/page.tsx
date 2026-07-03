import { NavLink } from '@/components'
import { LoginForm, UnprotectedPage } from '@/features/auth/components'

export default function LoginPage() {
  return (
    <UnprotectedPage>
      <main className='flex w-full flex-col items-center justify-center'>
        <h2 className='py-8 text-3xl'>Login</h2>
        <LoginForm />
        <nav className='flex flex-col justify-center gap-2 pt-4 text-center'>
          <NavLink href='/register'>New user? Create an account here</NavLink>
          <NavLink href='/forgot-password'>Forgot your password?</NavLink>
        </nav>
      </main>
    </UnprotectedPage>
  )
}
