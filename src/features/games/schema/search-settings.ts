import z from 'zod'

export const GameSearchSettingsSchema = z.object({
  query: z.string(),
})

export type GameSearchSettingsData = z.infer<typeof GameSearchSettingsSchema>
