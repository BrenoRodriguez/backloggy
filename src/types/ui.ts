import type { FieldControlProps } from '@base-ui/react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'

export type FieldProps<T extends FieldValues> = FieldControlProps &
  UseControllerProps<T> & {
    displayErrors?: boolean
    label?: React.ReactNode
    className?: string
  }
