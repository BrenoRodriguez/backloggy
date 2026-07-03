import type { BacklogItem } from '../types'
import { BacklogCard } from './BacklogCard'

type BacklogProps = {
  backlogEntries: BacklogItem[]
}

export function Backlog({ backlogEntries }: BacklogProps) {
  return (
    <section>
      {backlogEntries.map((backlogEntry) => (
        <BacklogCard key={backlogEntry.game.slug} backlogEntry={backlogEntry} />
      ))}
    </section>
  )
}
