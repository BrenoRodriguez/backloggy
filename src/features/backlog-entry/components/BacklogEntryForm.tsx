'use client'

import { Button, InputField } from '@/components'
import { TabNavbar, type Tab } from '@/components/TabNavBar'
import type { BacklogEntryPayload } from '@/constants/dialog-handles'
import { replaceImageSize } from '@/utils'
import { Tabs } from '@base-ui/react/tabs'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import {
  FormProvider,
  useForm,
  useFormContext,
  type DefaultValues,
} from 'react-hook-form'
import { useCreateOrEditBacklogEntry } from '../hooks/useCreateOrEditBacklogEntryBacklogEntry'
import {
  BacklogEntrySchema,
  type BacklogEntryData,
  type BacklogEntryInput,
} from '../schema'
import { BacklogEntryCustomTagsPanel } from './BacklogEntryCustomTagsPanel'
import { BacklogEntryGeneralPanel } from './BacklogEntryGeneralPanel'
import { BacklogEntryReviewPanel } from './BacklogEntryReviewPanel'

type BacklogEntryProps = {
  data: BacklogEntryPayload['data']
  mode: BacklogEntryPayload['mode']
  toggleDialog: () => void
}

export function BacklogEntryForm({
  data,
  mode,
  toggleDialog,
}: BacklogEntryProps) {
  const defaultValuesAdd: DefaultValues<BacklogEntryInput> = {
    customCover: data?.cover ? `https:${replaceImageSize(data.cover)}` : '',
    customName: data?.name,
    sortOrder: data?.sortOrder,
    status: 'BACKLOG',
  }

  const BACKLOG_ENTRY_TAB_NAV_OPTIONS: Tab[] = [
    { value: 'general', label: 'General' },
    { value: 'custom-tags', label: 'Custom Tags' },
    { value: 'review', label: 'Review' },
  ]

  const form = useForm<BacklogEntryInput>({
    resolver: zodResolver(BacklogEntrySchema),
    defaultValues: defaultValuesAdd,

    mode: 'onBlur',
  })

  const { onSubmit } = useCreateOrEditBacklogEntry(
    data.id,
    toggleDialog,
    data.slug,
  )

  return (
    <FormProvider {...form}>
      <form
        className='flex flex-col gap-2'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex items-end gap-8'>
          <BacklogEntryCover />
          <div className='w-full'>
            <h4 className='font-medium text-2xl tracking-tighter'>
              {data?.name}
              <span className='pl-2 text-neutral-300 text-xl'>(2018)</span>
            </h4>
            {mode
              ? `${mode[0].toUpperCase()}${mode.slice(1).toLowerCase()} `
              : ''}
            Backlog Entry
          </div>
        </div>
        <Tabs.Root className='flex h-full w-full gap-8'>
          <TabNavbar
            tabs={BACKLOG_ENTRY_TAB_NAV_OPTIONS}
            variant='backlogEntry'
          />
          <BacklogEntryGeneralPanel
            platformSuggestions={data?.platformSuggestions ?? []}
          />
          <BacklogEntryCustomTagsPanel />
          <BacklogEntryReviewPanel />
        </Tabs.Root>

        <Button className='w-40 place-self-end tracking-tight' type='submit'>
          ADD GAME
        </Button>
      </form>
    </FormProvider>
  )
}

// Make a "select" for the cover using steamgriddb as well
export function BacklogEntryCover() {
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<BacklogEntryData>()
  return (
    <div>
      <div className='text-red-500'>{errors.playtimeMinutes?.message}</div>
      <div>
        <div className='h-62.75 w-49'>
          <Image
            src={watch('customCover') ?? ''}
            alt={`${watch('customName')} game cover.`}
            width={156}
            height={211}
            quality={100}
            className='size-full object-cover'
          />
          <InputField name='customCover' control={control} className='hidden' />
        </div>
      </div>
    </div>
  )
}
