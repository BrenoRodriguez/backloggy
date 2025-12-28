import { useGetCoverSrc } from '../hooks'

export const EditGameCover = () => {
  const { src, onError } = useGetCoverSrc()

  return (
    <div className='w-72'>
      <img
        src={src}
        onError={onError}
        alt='cover from the game being edited'
        className='w-72 rounded-sm'
      />
    </div>
  )
}
