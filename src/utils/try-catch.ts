export async function tryCatch<T>(
  promise: Promise<T>,
): Promise<[data: T | null, error: unknown]> {
  try {
    const data = await promise
    return [data, null]
  } catch (err) {
    return [null, err]
  }
}
