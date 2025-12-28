import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/metadata4')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/backlog/edit/settings/metadata4"!</div>
}
