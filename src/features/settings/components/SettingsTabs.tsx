'use client'

import { GeneralSettings } from './GeneralSettings'
import { PrioritySettings } from './PrioritySettings'

export function SettingsTabs() {
  return (
    <>
      <GeneralSettings />
      <PrioritySettings />
    </>
  )
}

/* 
<Tabs.Tab value='account'>Account</Tabs.Tab>
<Tabs.Tab value='profile'>Profile</Tabs.Tab>
<Tabs.Tab value='general'>General</Tabs.Tab>
<Tabs.Tab value='priority'>Priority</Tabs.Tab>
<Tabs.Tab value='custom-tags'>Custom Tags</Tabs.Tab>
<Tabs.Tab value='integrations'>Integrations</Tabs.Tab>

*/
