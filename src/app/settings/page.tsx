import { ProtectedPage } from '@/features/auth/components'
import { SettingsForm } from '@/features/settings/components/SettingsForm'

export default function SettingsPage() {
  return (
    <ProtectedPage>
      <main>
        <h2 className='py-8 text-center text-3xl'>Settings</h2>
        <SettingsForm defaultValues={{ genres: [] }} />
      </main>
    </ProtectedPage>
  )
}
