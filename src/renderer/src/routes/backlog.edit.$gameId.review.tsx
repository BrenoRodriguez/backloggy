import { createFileRoute } from '@tanstack/react-router'
import type { EditGameData } from '../features/edit-game/schema'
import { Controller, useFormContext } from 'react-hook-form'
import { TextAreaField } from '../components/ui/TextAreaField'
import { Rating } from '@breno_rodriguez/react-simple-stars'
import '@breno_rodriguez/react-simple-stars/dist/index.css'
import { Field } from '../components'

export const Route = createFileRoute('/backlog/edit/$gameId/review')({
  component: EditGameReviewSection,
})

function EditGameReviewSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<EditGameData>()

  return (
    <section className='h-[532px] w-md'>
      <Controller
        control={control}
        name='reviewScore'
        render={({ field }) => (
          <Field>
            <label htmlFor='editGameReview'>Review</label>
            <Rating
              defaultValue={field.value}
              onChange={field.onChange}
              isReadonly={false}
            />
          </Field>
        )}
      />
      <TextAreaField
        {...register('notes')}
        fieldName='editGameNotes'
        label='Notes'
        errorMessage={errors.notes?.message}
        rows={8}
      />
    </section>
  )
}
