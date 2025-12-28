import type { ComponentProps } from 'react'
import { Field } from './Field'
import { TextArea } from './TextArea'
import { FieldError } from './FieldError'

type TextAreaFieldProps = ComponentProps<'textarea'> & {
  label?: string
  fieldName: string
  errorMessage?: string
  className?: string
}

export const TextAreaField = ({
  fieldName,
  label,
  errorMessage,
  className,
  ref,
  ...props
}: TextAreaFieldProps) => {
  return (
    <Field>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <TextArea ref={ref} {...props} id={fieldName} className={className} />
      <FieldError errorMessage={errorMessage} />
    </Field>
  )
}
