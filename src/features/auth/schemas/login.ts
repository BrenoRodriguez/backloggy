import z from 'zod'

export const LoginSchema = z.object({
  email: z.string('E-mail is required!').min(1, 'E-mail is required!'),
  password: z.string('Password is required!'),
  keepSignedIn: z.boolean().optional(),
})

export type LoginData = z.infer<typeof LoginSchema>
