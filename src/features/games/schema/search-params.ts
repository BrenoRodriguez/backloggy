import z from 'zod'

export const GameSearchParamsSchema = z.object({
  query: z
    .string()
    .optional()
    .transform((query) => (query ? query : '')),
  page: z.coerce
    .number()
    .int()
    .optional()
    .transform((page) => (page ? page : 1)),
})

export type GameSearchParams = z.infer<typeof GameSearchParamsSchema>
