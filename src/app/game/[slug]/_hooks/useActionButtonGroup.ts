'use client'

import { useSimpleToggle } from '@/hooks'

export function useActionButtonGroup(defaultHasBacklogEntry: boolean) {
  const { isToggled: hasBacklogEntry, toggleState: toggleHasBacklogEntry } =
    useSimpleToggle(defaultHasBacklogEntry)
  const { isToggled: isWishlisted, toggleState: toggleIsWishlisted } =
    useSimpleToggle(false)
  const { isToggled: isReviewed, toggleState: toggleIsReviewed } =
    useSimpleToggle(false)

  return {
    hasBacklogEntry,
    toggleHasBacklogEntry,
    isWishlisted,
    toggleIsWishlisted,
    isReviewed,
    toggleIsReviewed,
  }
}
