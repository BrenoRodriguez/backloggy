'use client'

import { useState } from 'react'

export function useSimpleToggle(defaultValue: boolean = false) {
  const [isToggled, setIsToggled] = useState(defaultValue)

  function toggleState() {
    setIsToggled((previousState) => !previousState)
  }

  return {
    isToggled,
    toggleState,
    setIsToggled,
  }
}
