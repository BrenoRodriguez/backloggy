import type { ReactNode } from 'react'

type CardBodyItemProps<T> = {
  value: T
  formatter?: (value: T) => ReactNode
}

export const CardBodyItem = <T,>({
  value,
  formatter,
}: CardBodyItemProps<T>) => {
  if (!formatter) return <div>{`${value}`}</div>

  return <div>{formatter(value)}</div>
}
