'use client'

import { Fieldset, Tabs } from '@base-ui/react'
import { useFormContext } from 'react-hook-form'
import type { BacklogEntryData } from '../schema'

export function BacklogEntryReviewPanel() {
  const { control } = useFormContext<BacklogEntryData>()
  return (
    <Tabs.Panel value='review' className='h-full max-h-88 w-full max-w-3xl'>
      <Fieldset.Root className='h-full max-h-98 w-full max-w-3xl'>
        <Fieldset.Legend className='py-1.5'>Review</Fieldset.Legend>
      </Fieldset.Root>
    </Tabs.Panel>
  )
}
