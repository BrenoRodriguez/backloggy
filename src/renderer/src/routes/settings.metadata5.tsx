import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/metadata5')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/backlog/edit/settings/metadata5"!</div>
}
