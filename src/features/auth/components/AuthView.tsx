'use server'

import type { PropsWithChildren, ReactNode } from 'react'
import { getSession } from '../actions'

type AuthSwitchProps = PropsWithChildren & {
  visitorView: ReactNode
}

export async function AuthView({ children, visitorView }: AuthSwitchProps) {
  const { session } = await getSession()

  if (!session) return visitorView

  return children
}
