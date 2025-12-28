import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Dialog } from '../components'
import { EditGameDialogContent } from '../features/edit-game/components'
import { useGameToEdit } from '../features/edit-game/hooks'

export const Route = createFileRoute('/backlog/edit/$gameId')({
  component: EditGameDialogRoute,
})

function EditGameDialogRoute() {
  const navigate = useNavigate()
  const { gameToEdit } = useGameToEdit()

  if (!gameToEdit) return null // or loading

  return (
    <Dialog
      title='Edit Game'
      ariaLabelledby='edit-game-form'
      onClose={() => navigate({ to: '/backlog' })}
    >
      <EditGameDialogContent gameToEdit={gameToEdit} />
    </Dialog>
  )
}
