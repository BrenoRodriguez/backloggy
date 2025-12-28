import { FormProvider, useForm } from 'react-hook-form'
import { EditGameCover } from './EditGameCover'
import { EditGameNavBar } from './EditGameNavBar'
import { EditGameForm } from './EditGameForm'
import type { EditGameData } from '../schema'

export const EditGameDialogContent = ({ gameToEdit }) => {
  const form = useForm<EditGameData>({ defaultValues: { ...gameToEdit } })
  return (
    <FormProvider {...form}>
      <section className='flex items-center gap-16'>
        <EditGameCover />
        <div className='flex flex-col'>
          <EditGameNavBar />
          <EditGameForm />
        </div>
      </section>
    </FormProvider>
  )
}
