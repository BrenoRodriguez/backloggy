import { useFormContext } from 'react-hook-form'
import type { EditGameData } from '../schema'
import { FALLBACK_COVER_SRC } from '../constants'

export const useGetCoverSrc = () => {
  const { watch } = useFormContext<EditGameData>()
  const coverSrc = watch('cover')

  const onError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = FALLBACK_COVER_SRC
  }

  return {
    src: coverSrc && coverSrc.trim() !== '' ? coverSrc : FALLBACK_COVER_SRC,
    onError,
  }
}
