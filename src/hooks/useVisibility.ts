'use client'

import { useState } from 'react'

export function useVisibility(defaultValue: boolean = false) {
  const [isVisible, setIsVisible] = useState(defaultValue)

  function toggleVisibility() {
    setIsVisible((previousState) => !previousState)
  }

  return { isVisible, toggleVisibility }
}
