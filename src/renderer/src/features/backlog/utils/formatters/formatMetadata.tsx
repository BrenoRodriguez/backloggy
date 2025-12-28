import { Rating } from '@breno_rodriguez/react-simple-stars'
import '@breno_rodriguez/react-simple-stars/dist/index.css'

export const formatMetadata = (
  status: string,
  metadata?: string | null,
  review?: number | null,
) => {
  const blockedStatus = ['Completed', '100%', 'Dropped']

  if (blockedStatus.includes(status)) {
    return (
      <Rating defaultValue={review ?? 0} isReadonly={true} starAmount={5} />
    )
  }

  return metadata
}
