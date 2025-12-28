import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/metadata1')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/backlog/edit/settings/metadata"!</div>
}
