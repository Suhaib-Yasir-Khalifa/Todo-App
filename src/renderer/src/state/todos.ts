import { splitAtom } from 'jotai/utils'
import { atomWithLocalStorage } from '.'

export const todosAtom = atomWithLocalStorage<Todo[]>('todo-list', [])
export const todoAtomsAtom = splitAtom(todosAtom)
