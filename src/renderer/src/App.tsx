import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { format } from 'date-fns'
import useTodos from './hooks/useTodo'
import TodoItem from './components/TodoItem'

function App(): React.JSX.Element {
  const [isDark, setIsDark] = useState(true)
  const [updateTodoId, setUpdateTodoId] = useState<string | null>(null)
  const { toodsAtoms, deleteTodo } = useTodos()

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

      <div className="flex flex-col justify-center items-center ">
        <div className="w-[70%] h-max px-5 py-3 flex flex-col justify-center items-center">
          <div className="h-max  space-y-3 flex flex-col w-[52rem] justify-center items-center pt-[3rem]">
            <Button
              variant="outline"
              className="w-full justify-start h-20 text-xl text-primary"
              onClick={() => {
                setUpdateTodoId(null)
                setOpenDialog(true)
              }}
            >
              Add Todo
            </Button>
            {toodsAtoms.map((todoAtom) => {
              return (
                <TodoItem key={todoAtom.toString()} todoAtom={todoAtom} deleteTodo={deleteTodo} />
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
