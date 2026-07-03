'use client'

import { Tabs, type TabsTabProps } from '@base-ui/react'

export function BacklogEntryNavbar() {
  return (
    <Tabs.List className='flex h-full w-full max-w-49 flex-col items-center gap-2 pt-4 text-xl'>
      <BacklogEntryNavItem value='general'>General</BacklogEntryNavItem>
      <BacklogEntryNavItem value='custom-tags'>Custom Tags</BacklogEntryNavItem>
      <BacklogEntryNavItem value='review'>Review</BacklogEntryNavItem>
    </Tabs.List>
  )
}

type BacklogEntryNavItemProps = TabsTabProps & {
  children: React.ReactNode
}

export function BacklogEntryNavItem({
  children,
  ...props
}: BacklogEntryNavItemProps) {
  return (
    <Tabs.Tab
      className='w-full rounded-sm px-3 py-2 text-left data-active:bg-foreground'
      {...props}
    >
      {children}
    </Tabs.Tab>
  )
}
