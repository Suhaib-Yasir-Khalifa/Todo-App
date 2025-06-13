import { useState, useEffect } from 'react'
import { Calendar, Moon, Sun } from 'lucide-react'
import { Button } from './components/ui/button'
import { format } from 'date-fns'
import useTodos from './hooks/useTodo'
import TodoItem from './components/TodoItem'
import DialogPoping from './components/DialogPoping'
import CalendarFilter from './components/CalendarFilter'
import { cn } from './lib/utils'
import { useAtom } from 'jotai'
import { isCalendarSidebarAtom } from './state/todos'

function App(): React.JSX.Element {
  const [isDark, setIsDark] = useState(true)
  const { toodsAtoms, deleteTodo, addTodo } = useTodos()
  const [IsCalendarOpen, setIsCalendarOpen] = useAtom(isCalendarSidebarAtom)

  useEffect(() => {
    if (isDark) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [isDark])

  return (
    <main
      className={` select-none pt-16 h-full overflow-y-auto transition-all duration-100 flex flex-col space-y-10`}
    >
      <div className="w-[80%] flex items-center gap-20 mx-auto mb-16">
        <div className="flex flex-col justify-center items-center w-max h-max">
          <div className="font-extrabold text-5xl text-center">{format(new Date(), 'yyyy')}</div>
          <div className="flex flex-row justify-between space-x-3 font-bold text-2xl">
            {format(new Date(), 'd / MMM')}
          </div>
        </div>

        <div className="flex flex-col space-y-1 select-non ">
          <div className="font-extrabold text-[3.6rem]">Hello..</div>
          <div className="font-bold text-[2.1rem]  ">Let&apos;s Create Discipline</div>
        </div>
      </div>

      <div
        onClick={() => setIsDark(!isDark)}
        className="w-max h-max absolute top-10 right-10 cursor-pointer"
      >
        {!isDark ? (
          <Sun className="w-[2rem] h-max text-slate-900" />
        ) : (
          <Moon className="w-[2rem] h-max text-white transition-all" />
        )}
      </div>

      <div className="flex flex-wrap justify-center items-center ">
        <div className="w-[70%]  h-max px-5 py-3 flex flex-col justify-center items-center">
          <div className="h-max  space-y-3 flex flex-col w-[52rem] justify-center items-center pt-[3rem]">
            <div className="lg:w-full sm:w-3/4 h-max">
              <DialogPoping addTodo={addTodo}>
                <Button
                  variant="outline"
                  className="w-full justify-start h-20 text-xl text-primary"
                >
                  Add Todo
                </Button>
              </DialogPoping>
            </div>

            {toodsAtoms.map((todoAtom) => {
              return (
                <TodoItem key={todoAtom.toString()} todoAtom={todoAtom} deleteTodo={deleteTodo} />
              )
            })}
          </div>
        </div>
        <div>
          <CalendarFilter additionalClasses={'sm:hidden lg:flex'} />
          <div onClick={() => setIsCalendarOpen(!IsCalendarOpen)}>
            <Calendar
              className={cn(
                'font-extrabold w-10 h-10 p-1 sm:absolute lg:hidden top-26 cursor-pointer right-10 rounded-sm hover:bg-secondary'
              )}
            />
          </div>
          <div
            onClick={() => {
              setIsCalendarOpen(false)
            }}
            className={cn(
              !IsCalendarOpen ? 'opacity-0 z-[-1] scale-75' : 'opacity-100 z-[100] scale-100',
              'transition-all lg:opacity-0 lg:z-[-1] duration-200 ease-in-out w-full h-full absolute  flex justify-center items-center top-0 left-0 backdrop-blur-[3px]'
            )}
          >
            <CalendarFilter />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
