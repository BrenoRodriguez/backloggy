'use client'

import { InputField, LengthField } from '@/components'
import { ComboboxField } from '@/components/ComboboxField'
import { ToggleGroupField } from '@/components/ToggleGroupField'
import { useSettings } from '@/features/settings/context'
import { Tabs } from '@base-ui/react'
import { Fieldset } from '@base-ui/react/fieldset'
import { useFormContext } from 'react-hook-form'
import {
  BACKLOG_ENTRY_STATUS_OPTIONS,
  COMPLETION_STATUS_OPTIONS,
} from '../constants'
import type { BacklogEntryData } from '../schema'
import {
  mapPlatformSuggestionsToOptions,
  mapPrioritiesToOptions,
} from '../utils'

type GeneralPanelProps = {
  platformSuggestions: { id: number; label: string }[]
}

export function BacklogEntryGeneralPanel({
  platformSuggestions,
}: GeneralPanelProps) {
  return (
    <Tabs.Panel value='general' className='h-full max-h-98 w-full max-w-3xl'>
      <BasicInformationSection platformSuggestions={platformSuggestions} />
      <ProgressSection />
    </Tabs.Panel>
  )
}

export function BasicInformationSection({
  platformSuggestions,
}: GeneralPanelProps) {
  const { control } = useFormContext<BacklogEntryData>()
  const { priorities } = useSettings()
  const platformOptions = mapPlatformSuggestionsToOptions(platformSuggestions)
  const priorityOptions = mapPrioritiesToOptions(priorities)

  return (
    <Fieldset.Root className='w-full'>
      <Fieldset.Legend className='py-1.5'>Basic Information</Fieldset.Legend>
      <div className='flex w-full gap-6 pb-3'>
        <InputField
          control={control}
          name='customName'
          label='Custom Name'
          className='max-w-96'
        />
        <InputField
          label='Sort Order'
          name='sortOrder'
          control={control}
          className='w-full max-w-24'
        />
        <ComboboxField
          label='Platform'
          name='platformId'
          options={platformOptions}
          control={control}
          className='w-full max-w-48'
        />
      </div>
      <div className='flex gap-6 pb-3'>
        <InputField
          label='Custom Genres'
          name='customGenres'
          control={control}
          className='w-full max-w-96'
        />
        <ComboboxField
          label='Priority'
          name='priority'
          options={priorityOptions}
          control={control}
          className='w-full max-w-78'
        />
      </div>
    </Fieldset.Root>
  )
}
export function ProgressSection() {
  const { control } = useFormContext<BacklogEntryData>()
  return (
    <Fieldset.Root className='w-full pt-2'>
      <Fieldset.Legend className='py-1.5'>Progress</Fieldset.Legend>
      <div className='flex gap-6 pb-3'>
        <ToggleGroupField
          label='Status'
          name='status'
          options={BACKLOG_ENTRY_STATUS_OPTIONS}
          control={control}
        />
        <LengthField label='Length' name='completionTime' control={control} />
      </div>
      <div className='flex gap-6'>
        <ComboboxField
          label='Completion Status'
          name='completionStatus'
          options={COMPLETION_STATUS_OPTIONS}
          control={control}
          className='max-w-45'
        />
        <InputField
          label='Started On'
          name='startDate'
          type='date'
          control={control}
          className='max-w-38'
        />
        <InputField
          label='Finished On'
          name='endDate'
          type='date'
          control={control}
          className='max-w-38'
        />
        <LengthField
          label='Time Played'
          name='playtimeMinutes'
          control={control}
        />
      </div>
    </Fieldset.Root>
  )
}
