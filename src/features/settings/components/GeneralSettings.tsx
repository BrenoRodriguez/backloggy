'use client'

import { Dialog, Field } from '@/components'
import { useField, useSimpleToggle } from '@/hooks'
import type { FieldProps } from '@/types'
import { Dialog as DialogPrimitive, Tabs } from '@base-ui/react'
import { Plus } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { settingsGenreHandle } from '../constants'
import type { SettingsData } from '../schema'

export function GeneralSettings() {
  const { control } = useFormContext<SettingsData>()
  return (
    <Tabs.Panel value='general'>
      <GenresField control={control} name='genres' />
    </Tabs.Panel>
  )
}

function GenresField({ control, rules }: FieldProps<SettingsData>) {
  const { invalid, isDirty, isTouched, onBlur, value, onChange, error } =
    useField<SettingsData, 'genres'>('genres', control)
  const { isToggled, setIsToggled, toggleState } = useSimpleToggle()
  return (
    <Field
      invalid={invalid}
      isDirty={isDirty}
      isTouched={isTouched}
      name='genres'
      label='Custom Genres'
    >
      <DialogPrimitive.Trigger
        handle={settingsGenreHandle}
        className='w-46 rounded-sm bg-accent-normal px-4 py-1'
      >
        Manage Genres
      </DialogPrimitive.Trigger>
      <Dialog
        open={isToggled}
        setOpen={toggleState}
        handle={settingsGenreHandle}
        title='Manage Genres'
      >
        <section>
          <div className='flex gap-2'>
            <input className='rounded-sm border border-white' />
            <button type='button'>
              <Plus />
            </button>
          </div>
          <div className=''>
            {value.map(({ id, name }) => (
              <div key={`${id}${name}`}></div>
            ))}
          </div>
        </section>
      </Dialog>
    </Field>
  )
}
