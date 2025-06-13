import { Calendar } from './ui/calendar'
import { useAtom } from 'jotai'
import { calendarAtom } from '@/state/todos'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

function CalendarFilter({ additionalClasses }: { additionalClasses?: string }) {
  const [date, setDate] = useAtom(calendarAtom)
  useEffect(() => console.log(date), [date])

  return (
    <Calendar
      mode="range"
      selected={date}
      onSelect={setDate}
      className={cn('rounded-md border shadow-sm ', additionalClasses)}
      captionLayout="dropdown"
    />
  )
}

export default CalendarFilter
