import { Outlet } from '@tanstack/react-router'
import { Button } from '../../../components'
import { useFormContext } from 'react-hook-form'
import { useEditGame } from '../hooks'
import type { EditGameData } from '../schema'

export const EditGameForm = () => {
  const { handleSubmit } = useFormContext<EditGameData>()
  const { onSubmit } = useEditGame()

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <Outlet />
      <Button>Save Changes</Button>
    </form>
  )
}

/*
<NavItem to='/a' appearance='editGame'>
  <Gamepad2 strokeWidth={1.5} size={28} /> General
</NavItem>
<NavItem to='/a' appearance='editGame'>
  <Tag strokeWidth={1.5} size={23} /> Metadata
</NavItem>
<NavItem to='/a' appearance='editGame'>
  <File strokeWidth={1.5} size={23} /> Notes
</NavItem>

<form className='flex justify-between'>
  <img
    src='https://cdn2.steamgriddb.com/thumb/44f9aa14ec49ecda093774fe3b847a84.jpg'
    alt='cover edit'
    className='w-72'
  />
  <section className='flex flex-col'>
    <nav className='flex'></nav>
  </section>
  <Outlet />
</form>
*/
