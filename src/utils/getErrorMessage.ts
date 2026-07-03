export function getErrorMessage(value: unknown) {
  if (value instanceof Error) {
    return value.message
  }

  let stringifiedText = '[Unable to stringify the thrown value]'

  try {
    stringifiedText = JSON.stringify(value)
  } catch {}

  const error = new Error(
    `This value was thrown as is, not through an error: ${stringifiedText}`,
  )

  return error.message
}
