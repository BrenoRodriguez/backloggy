import { ProtectedPage } from '@/features/auth/components'
import { SettingsTab } from '@/features/settings/components/SettingsTabs'
import { Tabs } from '@base-ui/react'

export default function SettingsPage() {
  return (
    <ProtectedPage>
      <main>
        <h2 className='py-8 text-center text-3xl'>Settings</h2>
        <Tabs.Root>
          <SettingsTab />
        </Tabs.Root>
      </main>
    </ProtectedPage>
  )
}
