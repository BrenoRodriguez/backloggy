'use server'

import { redirect } from 'next/navigation'
import { getSession } from '../actions'

type UnprotectedPageProps = {
  children: React.ReactNode
}

export async function UnprotectedPage({ children }: UnprotectedPageProps) {
  const { session } = await getSession()

  if (session) redirect('/')

  return children
}
