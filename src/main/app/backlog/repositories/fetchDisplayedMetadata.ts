import { prisma } from '../../../lib/prisma'
import { DisplayedMetadataSchema } from '../schemas/displayedMetadata'

export const fetchDisplayedMetadata = async () => {
  const settings = await prisma.settings.findFirst({
    select: {
      displayedMetadata: true,
    },
  })

  return DisplayedMetadataSchema.parse(settings)
}
