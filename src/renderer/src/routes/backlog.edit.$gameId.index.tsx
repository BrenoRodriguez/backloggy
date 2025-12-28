import { createFileRoute } from '@tanstack/react-router'
import { InputField } from '../components/ui/InputField'
import { Controller, useFormContext } from 'react-hook-form'
import type { EditGameData } from '../features/edit-game/schema'
import { MultiSelectField } from '../components/ui/MultiSelectField'
import { AutoCompleteField } from '../components/ui/AutoCompleteField'
import {
  GAME_PLATFORM_SUGGESTIONS,
  GAME_STATUS_SUGGESTIONS,
} from '../constants'
import { FormRow } from '../components/ui/FormRow'

export const Route = createFileRoute('/backlog/edit/$gameId/')({
  component: EditGameGeneralSection,
})

function EditGameGeneralSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EditGameData>()
  return (
    <section className='h-[532px] w-md'>
      <FormRow>
        <InputField
          {...register('name')}
          fieldName='editGameName'
          label='Name'
          className='w-full'
          errorMessage={errors.name?.message}
        />
        <InputField
          {...register('position')}
          fieldName='editGamePosition'
          label='Position'
          className='w-18'
          errorMessage={errors.position?.message}
        />
      </FormRow>
      <InputField
        {...register('cover')}
        fieldName='editGameCover'
        errorMessage={errors.cover?.message}
        label='Cover'
      />
      <Controller
        control={control}
        name='genres'
        render={({ field }) => (
          <MultiSelectField
            label='Genres'
            options={[]}
            selectedItems={field.value}
            onChange={field.onChange}
            fieldName='editGameGenres'
            errorMessage={errors.genres?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='status'
        render={({ field }) => (
          <AutoCompleteField
            label='Status'
            options={GAME_STATUS_SUGGESTIONS}
            fieldName='editGameStatus'
            value={field.value}
            onChange={field.onChange}
            errorMessage={errors.status?.message}
          />
        )}
      />
      <FormRow>
        <Controller
          control={control}
          name='platform'
          render={({ field }) => (
            <AutoCompleteField
              label='Platform'
              options={GAME_PLATFORM_SUGGESTIONS}
              fieldName='editGamePlatform'
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.platform?.message}
            />
          )}
        />
        <InputField
          {...register('length')}
          fieldName='editGameLength'
          label='Length'
          errorMessage={errors.length?.message}
        />
      </FormRow>
    </section>
  )
}
