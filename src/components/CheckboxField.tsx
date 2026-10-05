'use client'

import type { FieldProps } from '@/types'
import { Checkbox, Field } from '@base-ui/react'
import { useController, type FieldValues } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export function CheckboxField<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  className,
  ...props
}: FieldProps<T>) {
  const { field, fieldState } = useController<T>({ name, control, rules })

  const { invalid, isDirty, isTouched } = fieldState
  const { ref, value, onBlur, onChange } = field

  return (
    <Field.Root
      name={name}
      className={twMerge(
        'flex w-full flex-col gap-2 bg-neutral-950',
        className,
      )}
      data-invalid={invalid}
      touched={isTouched}
      dirty={isDirty}
    >
      <div className='flex w-full items-start gap-2'>
        <Field.Control
          ref={ref}
          render={
            <Checkbox.Root
              checked={value ?? false}
              onCheckedChange={(checked) => onChange(checked)}
              className='mt-1 flex size-5 min-w-5 items-center justify-center rounded-sm data-unchecked:border data-unchecked:border-neutral-800 data-checked:bg-accent-normal'
            >
              <Checkbox.Indicator className='flex text-white data-unchecked:hidden'>
                <svg
                  fill='currentcolor'
                  width='14'
                  height='14'
                  viewBox='0 0 10 10'
                  size='3'
                >
                  <path d='M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z' />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Root>
          }
          value={value ?? ''}
          onBlur={onBlur}
          aria-invalid={invalid || undefined}
          onValueChange={onChange}
          autoComplete='off'
          {...props}
        />
        <Field.Label className=''>{label}</Field.Label>
      </div>
      <div className='h-1'></div>
    </Field.Root>
  )
}

/*
         className='rounded-sm border border-neutral-800 bg-foreground px-2 py-1 text-lg transition-colors duration-200 ease-in hover:border-accent-light focus-visible:border-accent-normal focus-visible:outline-none aria-invalid:border-red-500'
         <Field.Error match={!!error} className='h-4 text-red-500 text-sm'>
           {error?.message}
         </Field.Error>
*/
