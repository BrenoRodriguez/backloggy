import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editBacklogGame } from '../utils'
import { EditGameSchema, type EditGameData } from '../schema'
import { Route } from '../../../routes/backlog.edit.$gameId'
import { useNavigate } from '@tanstack/react-router'

export const useEditGame = () => {
  const queryClient = useQueryClient()

  const editBacklogGameMutation = useMutation({
    mutationFn: editBacklogGame,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['backlog-games'],
      })
    },
  })
  const navigate = useNavigate()

  const { gameId } = Route.useParams()

  const id = Number(gameId)

  const onSubmit = (gameToEdit: EditGameData) => {
    const parsedGameToEdit = EditGameSchema.parse(gameToEdit)

    editBacklogGameMutation.mutate({ id, ...parsedGameToEdit })
    navigate({ to: '/backlog' })
  }

  return {
    onSubmit,
  }
}
