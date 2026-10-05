'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { TabNavbar, type Tab } from '@/components/TabNavBar'
import { Tabs } from '@base-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { SettingsSchema, type SettingsData } from '../schema'
import { SettingsTabs } from './SettingsTabs'

type SettingsFormProps = {
  defaultValues: { genres: { id: string; name: string }[] }
}

export function SettingsForm({ defaultValues }: SettingsFormProps) {
  const SETTINGS_TAB_NAV_OPTIONS: Tab[] = [
    { value: 'general', label: 'General' },
  ]

  const form = useForm<SettingsData>({
    resolver: zodResolver(SettingsSchema),
    mode: 'onBlur',
    defaultValues,
  })

  return (
    <FormProvider {...form}>
      <form>
        <Tabs.Root>
          <TabNavbar tabs={SETTINGS_TAB_NAV_OPTIONS} variant='settings' />
          <SettingsTabs />
        </Tabs.Root>
      </form>
    </FormProvider>
  )
}
