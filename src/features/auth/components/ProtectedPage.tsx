'use server'

import { redirect } from 'next/navigation'
import { getSession } from '../actions'

type ProtectedPageProps = {
  children: React.ReactNode
}

export async function ProtectedPage({ children }: ProtectedPageProps) {
  const { session } = await getSession()

  if (!session) redirect('/')

  return children
}
