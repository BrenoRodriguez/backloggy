'use client'

import { createUseContextHook } from '@/utils'
import { createContext } from 'react'
import type { Settings } from '../types'

export const SettingsContext = createContext<Settings | undefined>(undefined)

export const useSettings = createUseContextHook(SettingsContext, 'Settings')
