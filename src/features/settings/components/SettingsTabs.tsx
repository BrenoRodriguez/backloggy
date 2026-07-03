'use client'

import { Tabs } from '@base-ui/react'

export function SettingsTab() {
  return (
    <Tabs.List>
      <Tabs.Tab value='account'>Account</Tabs.Tab>
      <Tabs.Tab value='profile'>Profile</Tabs.Tab>
      <Tabs.Tab value='general'>General</Tabs.Tab>
      <Tabs.Tab value='priority'>Priority</Tabs.Tab>
      <Tabs.Tab value='custom-tags'>Custom Tags</Tabs.Tab>
      <Tabs.Tab value='integrations'>Integrations</Tabs.Tab>
    </Tabs.List>
  )
}
