import z from 'zod'

const USERNAME_CHARACTER_LIMIT = 18

export const RegisterSchema = z
  .object({
    username: z
      .string('Username is required!')
      .min(1, 'Username is required!')
      .max(USERNAME_CHARACTER_LIMIT, 'Maximum of 18 characters'),
    email: z.email({ error: 'Invalid email address!' }),
    password: z
      .string('Password is required!')
      .min(10, 'Minimum of 10 characters')
      .refine((value) => /[A-Z]/.test(value), {
        error: 'Password must contain at least one uppercase letter!',
      })
      .refine((value) => /[0-9]/.test(value), {
        error: 'Password must contain at least one number!',
      })
      .refine((value) => /[^A-Za-z0-9]/.test(value), {
        error: 'Password must contain at least one symbol!',
      }),
    confirmPassword: z
      .string('Confirm password is required!')
      .min(10, 'Minimum of 10 characters!'),
    acceptTOS: z.boolean(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword', 'password'],
    error: 'Passwords must be the same in both fields!',
  })

export type RegisterData = z.infer<typeof RegisterSchema>
