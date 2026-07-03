'use client'

import { Field as FieldPrimitive } from '@base-ui/react'
import type React from 'react'
import type { FieldError, FieldValues, Path } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type InputFieldProps<T extends FieldValues> = {
  children: React.ReactNode
  name: Path<T>
  label?: React.ReactNode
  error?: FieldError
  invalid: boolean
  isTouched: boolean
  isDirty: boolean
  className?: string
  displayErrors?: boolean
}

export function Field<T extends FieldValues>({
  name,
  isDirty,
  isTouched,
  invalid,
  label,
  className,
  children,
  error,
  displayErrors = false,
}: InputFieldProps<T>) {
  return (
    <FieldPrimitive.Root
      name={name}
      className={twMerge(
        'flex w-full flex-col gap-1 bg-neutral-950',
        className,
      )}
      data-invalid={invalid}
      touched={isTouched}
      dirty={isDirty}
    >
      <FieldPrimitive.Label className='pb-0.5 text-base'>
        {label}
      </FieldPrimitive.Label>
      {children}
      {displayErrors && (
        <div className='h-4'>
          <FieldPrimitive.Error
            match={!!error}
            className='h-4 select-text text-red-500 text-sm'
          >
            {error?.message}
          </FieldPrimitive.Error>
        </div>
      )}
    </FieldPrimitive.Root>
  )
}

/* 
<div className='h-4'>
<Field.Error match={!!error} className='h-4 text-red-500 text-sm'>
  {error?.message}
</Field.Error>
</div>
*/
