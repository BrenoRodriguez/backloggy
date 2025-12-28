export function ensureErrorMessage(value: unknown) {
  if (value instanceof Error) {
    return value
  }

  let stringified = '[Unable to stringify the thrown value]'

  try {
    stringified = JSON.stringify(value)
  } catch {
    /* empty */
  }

  const error = new Error(
    `This value was throw as is, not through an Error: ${stringified}`,
  )

  return error.message
}
