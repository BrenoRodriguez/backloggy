import { createFileRoute } from '@tanstack/react-router'
import type { EditGameData } from '../features/edit-game/schema'
import { Controller, useFormContext } from 'react-hook-form'
import { AutoCompleteField } from '../components/ui/AutoCompleteField'
import { useSettings } from '../features/settings/context'

export const Route = createFileRoute('/backlog/edit/$gameId/metadata')({
  component: EditGameMetadataSection,
})

function EditGameMetadataSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<EditGameData>()
  const { metadata1, metadata2, metadata3, metadata4, metadata5 } =
    useSettings()
  return (
    <section className='h-[532px] w-md'>
      <Controller
        control={control}
        name='metadata1'
        render={({ field }) => (
          <AutoCompleteField
            label={metadata1.label}
            options={metadata1.presets}
            fieldName='editGameMetadata1'
            value={field.value}
            onChange={field.onChange}
            errorMessage={errors.metadata1?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='metadata2'
        render={({ field }) => (
          <AutoCompleteField
            label={metadata2.label}
            options={metadata2.presets}
            fieldName='editGameMetadata2'
            value={field.value}
            onChange={field.onChange}
            errorMessage={errors.metadata2?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='metadata3'
        render={({ field }) => (
          <AutoCompleteField
            label={metadata3.label}
            options={metadata3.presets}
            fieldName='editGameMetadata3'
            value={field.value}
            onChange={field.onChange}
            errorMessage={errors.metadata3?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='metadata4'
        render={({ field }) => (
          <AutoCompleteField
            label={metadata4.label}
            options={metadata4.presets}
            fieldName='editGameMetadata4'
            value={field.value}
            onChange={field.onChange}
            errorMessage={errors.metadata4?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='metadata5'
        render={({ field }) => (
          <AutoCompleteField
            label={metadata5.label}
            options={metadata5.presets}
            fieldName='editGameMetadata5'
            value={field.value}
            onChange={field.onChange}
            errorMessage={errors.metadata5?.message}
          />
        )}
      />
    </section>
  )
}
