'use client'

import { CustomTagField } from '@/components/CustomTagField'
import { Fieldset, Tabs } from '@base-ui/react'
import { useFormContext } from 'react-hook-form'
import type { BacklogEntryData } from '../schema'

export function BacklogEntryCustomTagsPanel() {
  const { control } = useFormContext<BacklogEntryData>()
  return (
    <Tabs.Panel
      value='custom-tags'
      className='h-full max-h-88 w-full max-w-3xl'
    >
      <Fieldset.Root className='h-full max-h-98 w-full max-w-3xl'>
        <Fieldset.Legend className='py-1.5'>Custom Tags</Fieldset.Legend>
        <CustomTagField
          customTagNumber={0}
          control={control}
          name='customTag1'
          className='w-96 pb-3'
        />
        <CustomTagField
          customTagNumber={1}
          control={control}
          name='customTag2'
          className='w-96 pb-3'
        />
        <CustomTagField
          customTagNumber={2}
          control={control}
          name='customTag3'
          className='w-96 pb-3'
        />
        <CustomTagField
          customTagNumber={3}
          control={control}
          name='customTag4'
          className='w-96 pb-3'
        />
        <CustomTagField
          customTagNumber={4}
          control={control}
          name='customTag5'
          className='w-96 pb-3'
        />
      </Fieldset.Root>
    </Tabs.Panel>
  )
}
