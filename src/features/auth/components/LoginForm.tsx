'use client'

import { Button, CheckboxField, InputField } from '@/components'
import { createSubmitHandler } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { login } from '../actions'
import { type LoginData, LoginSchema } from '../schemas'

export function LoginForm() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      keepSignedIn: false,
    },
    mode: 'onBlur',
  })
  return (
    <form
      className='flex w-full max-w-113.75 flex-col gap-2 px-6'
      onSubmit={handleSubmit(
        createSubmitHandler(login, () => router.push('/')),
      )}
    >
      <InputField name='email' label='E-mail' control={control} />
      <InputField
        name='password'
        label='Password'
        control={control}
        type='password'
      />
      <CheckboxField
        name='keepSignedIn'
        control={control}
        label='Keep me signed in'
      />
      <Button
        type='submit'
        disabled={isSubmitting}
        className='py-2 font-medium text-lg'
      >
        Login
      </Button>
    </form>
  )
}
