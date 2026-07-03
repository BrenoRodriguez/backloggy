'use client'

import { useCallback, useEffect, useState } from 'react'

function hideZeroFromInput(value: number) {
  if (value === 0) return ''
  return value.toString()
}

export function useLengthField(
  rawTotalMinutes: number,
  onChange: (value: number) => void,
  onBlur: () => void,
) {
  const totalMinutes = rawTotalMinutes ?? 0

  const defaultHours = Math.floor(totalMinutes / 60)
  const defaultMinutes = totalMinutes % 60

  const [hours, setHours] = useState(hideZeroFromInput(defaultHours))
  const [minutes, setMinutes] = useState(hideZeroFromInput(defaultMinutes))

  useEffect(() => {
    setHours(hideZeroFromInput(defaultHours))
    setMinutes(hideZeroFromInput(defaultMinutes))
  }, [defaultHours, defaultMinutes])

  const sanitizeHours = useCallback((value: string) => {
    const digits = value.replace(/\D/g, '')

    if (!digits) {
      return 0
    }

    return Math.floor(Number(digits))
  }, [])

  const sanitizeMinutes = useCallback((value: string) => {
    const digits = value.replace(/\D/g, '')

    if (!digits) {
      return 0
    }

    const rawMinutes = Math.floor(Number(digits))

    return Math.min(59, Math.max(0, rawMinutes))
  }, [])

  const handleHoursBlur = useCallback(() => {
    const newHours = sanitizeHours(hours)
    const newTotal = newHours * 60 + (totalMinutes % 60)
    onChange(newTotal)
    setHours(hideZeroFromInput(newHours))
    onBlur()
  }, [hours, totalMinutes, onChange, onBlur, sanitizeHours])

  const handleMinutesBlur = useCallback(() => {
    const newMinutes = sanitizeMinutes(minutes)
    const newTotal = Math.floor(totalMinutes / 60) * 60 + newMinutes
    onChange(newTotal)
    setMinutes(hideZeroFromInput(newMinutes))
    onBlur()
  }, [minutes, totalMinutes, onChange, onBlur, sanitizeMinutes])

  return {
    handleHoursBlur,
    handleMinutesBlur,
    hours,
    minutes,
    setHours,
    setMinutes,
  }
}
