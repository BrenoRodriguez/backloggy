'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function usePaginationNav() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function updateUrlParamsPage(page: number): () => void {
    return () => {
      const params = new URLSearchParams(searchParams.toString())

      params.set('page', `${page}`)

      router.replace(`${pathname}?${params.toString()}`)
    }
  }

  return { updateUrlParamsPage }
}
