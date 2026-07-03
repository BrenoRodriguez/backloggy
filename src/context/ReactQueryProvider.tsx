'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren, useState } from 'react'

export function ReactQueryProvider({ children }: PropsWithChildren) {
  const [queryClient, setQueryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
