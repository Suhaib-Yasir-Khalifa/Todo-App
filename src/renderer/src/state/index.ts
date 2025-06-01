import { SetStateAction, WritableAtom, atom } from 'jotai'
import { debounce } from 'lodash'

export function atomWithLocalStorage<T>(
  key: string,
  initialValue: T
): WritableAtom<T, [SetStateAction<T>], void> {
  const getInitialValue = () => {
    const item = window.api.store.get(key)
    if (!item) {
      return initialValue
    }

    // add new props from initialValue to items if exists
    if (typeof initialValue === 'object' && !Array.isArray(initialValue)) {
      return {
        ...initialValue,
        ...item
      }
    }

    return item
  }

  const debouncedWrite = debounce(
    (targetKey, value) => {
      window.api.store.set(targetKey, value)
    },
    750,
    { leading: false, trailing: true }
  )

  const baseAtom = atom(getInitialValue())
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      debouncedWrite(key, nextValue)
    }
  )
  return derivedAtom
}
