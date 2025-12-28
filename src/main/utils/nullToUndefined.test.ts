import { it } from 'vitest'
import { nullToUndefined } from './nullToUndefined'

it.concurrent('properly transforms null to undefined', ({ expect }) => {
  expect(nullToUndefined(null)).toBe(undefined)
})

it.concurrent('properly transforms null to undefined', ({ expect }) => {
  expect(nullToUndefined('text')).toBe('text')
})

it.concurrent('properly transforms null to undefined', ({ expect }) => {
  expect(nullToUndefined(undefined)).toBe(undefined)
})

it.concurrent('properly transforms null to undefined', ({ expect }) => {
  expect(nullToUndefined(15)).toBe(15)
})

it.concurrent('properly transforms null to undefined', ({ expect }) => {
  expect(nullToUndefined('')).toBe('')
})

it.concurrent('properly transforms null to undefined', ({ expect }) => {
  const array: unknown[] = []
  expect(nullToUndefined(array)).toBe(array)
})

it.concurrent('properly transforms null to undefined', ({ expect }) => {
  const array: unknown[] = [null]
  expect(nullToUndefined(array)).toBe(array)
})

it.concurrent('properly transforms null to undefined', ({ expect }) => {
  const object: {} = {}
  expect(nullToUndefined(object)).toBe(object)
})

it.concurrent('properly transforms null to undefined', ({ expect }) => {
  const object: {} = {
    name: 'John',
    age: null,
  }
  expect(nullToUndefined(object)).toBe(object)
})
