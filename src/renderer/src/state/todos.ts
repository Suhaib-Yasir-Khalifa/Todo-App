import { splitAtom } from 'jotai/utils'
import { atomWithLocalStorage } from '.'
import { atom } from 'jotai'
import { DateRange } from 'react-day-picker'

export const todosAtom = atomWithLocalStorage<Todo[]>('todo-list', [])
export const calendarAtom = atom<DateRange | undefined>()
export const isCalendarSidebarAtom = atom(false)
export const todoAtomsAtom = splitAtom(todosAtom)
