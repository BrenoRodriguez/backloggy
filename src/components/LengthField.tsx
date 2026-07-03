'use client'

import { useLengthField } from '@/features/backlog-entry/hooks/useLengthField'
import { useField } from '@/hooks'

import { type FieldControlProps, Input } from '@base-ui/react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { Field } from './ui'

type LengthFieldProps<T extends FieldValues> = Omit<
  FieldControlProps,
  'onChange'
> &
  UseControllerProps<T> & {
    label?: string
  }

export function LengthField<T extends FieldValues>({
  name,
  control,
  rules,
  label,
}: LengthFieldProps<T>) {
  const { invalid, isDirty, isTouched, onBlur, value, onChange, error } =
    useField<T>(name, control, rules)
  const {
    hours,
    minutes,
    handleHoursBlur,
    handleMinutesBlur,
    setHours,
    setMinutes,
  } = useLengthField(value, onChange, onBlur)
  return (
    <Field
      invalid={invalid}
      isDirty={isDirty}
      isTouched={isTouched}
      name={name}
      label={label}
    >
      <div className='flex gap-2'>
        <div className='flex w-18 items-center rounded-sm border border-neutral-800 bg-neutral-800/70 text-xl aria-invalid:border-red-500'>
          <Input
            value={hours}
            onChange={(event) => setHours(event.target.value)}
            onBlur={handleHoursBlur}
            className='w-10 rounded-l-sm border-neutral-800 border-r bg-foreground px-2 py-1 text-xl focus:outline-none'
            maxLength={2}
          />
          <span className='flex w-8 items-center justify-center text-neutral-400/70'>
            h
          </span>
        </div>
        <div className='flex w-18 items-center rounded-sm border border-neutral-800 bg-neutral-800/70 text-xl aria-invalid:border-red-500'>
          <Input
            className='w-10 rounded-l-sm border-neutral-800 border-r bg-foreground px-2 py-1 text-xl focus:outline-none'
            value={minutes}
            onChange={(event) => setMinutes(event.target.value)}
            onBlur={handleMinutesBlur}
          />
          <span className='flex w-8 items-center justify-center text-neutral-400/70'>
            m
          </span>
        </div>
      </div>
    </Field>
  )
}
