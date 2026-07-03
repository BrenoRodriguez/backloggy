import { fetchUserAvatar } from '@/features/layout/actions'
import { Avatar } from '@base-ui/react/avatar'

export async function AvatarProfile() {
  const { username, avatarURL } = await fetchUserAvatar()
  return (
    <Avatar.Root className='flex size-10 cursor-pointer select-none items-center justify-center rounded-full bg-neutral-800 align-middle'>
      <Avatar.Image
        src={avatarURL}
        width='40'
        height='40'
        className='size-full object-cover'
      />
      <Avatar.Fallback className='flex size-full items-center justify-center font-semibold text-base'>
        {username[0].toUpperCase()}
      </Avatar.Fallback>
    </Avatar.Root>
  )
}
