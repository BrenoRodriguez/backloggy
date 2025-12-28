import { DisplayName } from '../../../../components'
import { useGameCard } from '../../context'

export const CardHeader = () => {
  const { name } = useGameCard()
  return (
    <div className='w-full border-stone-900 border-b py-3 text-center text-lg'>
      <DisplayName name={name} />
    </div>
  )
}
