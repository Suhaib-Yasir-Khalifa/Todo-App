import { calendarAtom } from '@/state/todos'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

const useCalndarFilter = (todo: Todo) => {
  const dateRange = useAtomValue(calendarAtom)
  const isTodoInRange = useMemo(() => {
    if (dateRange && dateRange.from && dateRange.to) {
      if (
        todo.createdAt >= dateRange?.from.getTime() &&
        todo.createdAt <= dateRange?.to.getTime()
      ) {
        return true
      } else return false
    }
    return true
  }, [dateRange, todo.createdAt])

  return isTodoInRange
}

export default useCalndarFilter
