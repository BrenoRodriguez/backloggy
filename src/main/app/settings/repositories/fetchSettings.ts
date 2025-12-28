import { prisma } from '../../../lib/prisma'
import { SettingsSchema } from '../schemas'

export const fetchSettings = async () => {
  const settings = await prisma.settings.findFirst()

  return SettingsSchema.parse(settings)
}
