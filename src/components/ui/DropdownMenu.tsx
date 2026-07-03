'use client'

import { Menu, type MenuTriggerProps } from '@base-ui/react/menu'

type DropdownMenuProps = MenuTriggerProps & {
  children: React.ReactNode
  options: {
    label: string
    element: React.ReactNode
  }[]
}

export function DropdownMenu({
  children,
  options,
  ...props
}: DropdownMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger {...props}>{children}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Backdrop />
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Arrow />
            {options.map((option) => {
              return <Menu.Item key={option.label}>{option.element}</Menu.Item>
            })}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
