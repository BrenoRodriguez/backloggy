import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from 'react'

type AsProp<T extends ElementType> = {
  as?: T
}

export type PolymorphicComponentProps<
  T extends ElementType,
  Props extends Record<string, unknown>,
> = PropsWithChildren<Props> &
  AsProp<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof Props | 'as'>
