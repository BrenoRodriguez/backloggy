'use client'

import { Button, CheckboxField, InputField } from '@/components'
import { createSubmitHandler } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { register } from '../actions'
import { RegisterSchema, type RegisterData } from '../schemas'

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      acceptTOS: false,
    },
    mode: 'onBlur',
  })
  const router = useRouter()

  return (
    <form
      className='flex w-full max-w-113.75 flex-col gap-2 px-6'
      onSubmit={handleSubmit(
        createSubmitHandler(register, () => router.push('/')),
      )}
    >
      <InputField name='username' label='Username' control={control} />
      <InputField name='email' label='E-mail' control={control} type='email' />
      <InputField
        name='password'
        label='Password'
        control={control}
        type='password'
      />
      <InputField
        name='confirmPassword'
        label='Confirm Password'
        control={control}
        type='password'
      />
      <CheckboxField
        name='acceptTOS'
        label={
          <>
            I accept the{' '}
            <Link
              href='/terms-of-service'
              className='text-accent-normal transition-colors duration-200 ease-in hover:text-accent-light'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy-policy'
              className='text-accent-normal transition-colors duration-200 ease-in hover:text-accent-light'
            >
              Privacy Policy
            </Link>
            .
          </>
        }
        control={control}
        type='checkbox'
      />
      <Button type='submit' className='py-2 font-medium text-lg'>
        Register
      </Button>
    </form>
  )
}
//        disabled={!watch('acceptTOS') || isSubmitting || isValid}
