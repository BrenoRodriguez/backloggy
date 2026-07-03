import { NavLink } from '@/components'
import { UnprotectedPage, RegisterForm } from '@/features/auth/components'

export default function SignUpPage() {
  return (
    <UnprotectedPage>
      <main className='flex w-full flex-col items-center justify-center'>
        <h2 className='py-8 text-3xl'>Registration</h2>
        <RegisterForm />
        <nav className='flex flex-col justify-center gap-2 pt-4 text-center'>
          <NavLink href='/login'>Already have an account? Log in</NavLink>
        </nav>
      </main>
    </UnprotectedPage>
  )
}
