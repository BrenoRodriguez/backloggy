import z from 'zod'

const genres = z.object({
  id: z.string(),
  name: z.string(),
})

const GeneralSettingsSchema = z.object({
  genres: z.array(genres),
})

export const SettingsSchema = GeneralSettingsSchema

/*
{
  priority1: z.string(),
  priority2: z.string(),
  priority3: z.string(),
  priority4: z.string(),
  priority5: z.string(),
  priority6: z.string(),
  priority7: z.string(),
  priority8: z.string(),
  priority9: z.string(),
  priority10: z.string(),
  customTag1Status: z.boolean(),
  customTag1Label: z.string(),
  customTag1Presets: z.array(z.string()).optional(),
  customTag2Status: z.boolean(),
  customTag2Label: z.string(),
  customTag2Presets: z.array(z.string()).optional(),
  customTag3Status: z.boolean(),
  customTag3Label: z.string(),
  customTag3Presets: z.array(z.string()).optional(),
  customTag4Status: z.boolean(),
  customTag4Label: z.string(),
  customTag4Presets: z.array(z.string()).optional(),
  customTag5Status: z.boolean(),
  customTag5Label: z.string(),
  customTag5Presets: z.array(z.string()).optional(),
  genres: z.string(),
}

*/

export type SettingsData = z.infer<typeof SettingsSchema>
