'use client'

import { Tabs, type TabsTabProps } from '@base-ui/react'
import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'

export type Tab = { value: string; label: React.ReactNode | string }

type TabNavBarProps = {
  tabs: Tab[]
} & VariantProps<typeof navbarVariants>

const navbarVariants = cva('', {
  variants: {
    variant: {
      backlogEntry:
        'flex h-full w-full max-w-49 flex-col items-center gap-2 pt-4 text-xl',
      settings: '',
    },
  },
})

export function TabNavbar({ tabs, variant }: TabNavBarProps) {
  return (
    <Tabs.List className={navbarVariants({ variant })}>
      {tabs.map(({ label, value }) => (
        <TabNavItem key={value} value={value} variant={variant}>
          {label}
        </TabNavItem>
      ))}
    </Tabs.List>
  )
}

type NavItemProps = TabsTabProps & {
  children: React.ReactNode
} & VariantProps<typeof navItemVariants>

const navItemVariants = cva('', {
  variants: {
    variant: {
      backlogEntry:
        'w-full rounded-sm px-3 py-2 text-left data-active:bg-foreground',
      settings: '',
    },
  },
})

export function TabNavItem({ children, variant, ...props }: NavItemProps) {
  return (
    <Tabs.Tab className={navItemVariants({ variant })} {...props}>
      {children}
    </Tabs.Tab>
  )
}
