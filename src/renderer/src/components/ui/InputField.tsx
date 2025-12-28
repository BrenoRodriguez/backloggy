import { type ComponentProps, forwardRef } from 'react'
import { Input } from './Input'
import { Field } from './Field'
import { FieldError } from './FieldError'

type InputFieldProps = ComponentProps<'input'> & {
  label?: string
  fieldName: string
  errorMessage?: string
  className?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, fieldName, errorMessage, className, ...props }, ref) => {
    return (
      <Field className={className}>
        {label && <label htmlFor={fieldName}>{label}</label>}
        <Input ref={ref} {...props} id={fieldName} className={className} />
        <FieldError errorMessage={errorMessage} />
      </Field>
    )
  },
)
