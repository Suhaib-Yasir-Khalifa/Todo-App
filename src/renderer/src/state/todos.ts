import { atom } from 'jotai'
import { splitAtom } from 'jotai/utils'

export const todosAtom = atom<Todo[]>([])
export const todoAtomsAtom = splitAtom(todosAtom)
