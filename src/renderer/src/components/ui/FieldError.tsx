type FieldErrorProps = {
  errorMessage?: string
}

export const FieldError = ({ errorMessage }: FieldErrorProps) => {
  return <span className='h-4'>{errorMessage ? errorMessage : ''}</span>
}
