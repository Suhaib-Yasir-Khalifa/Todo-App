import { format } from 'date-fns'
import { Checkbox } from './ui/checkbox'
import { PrimitiveAtom, useAtom } from 'jotai'
import { Button } from './ui/button'
import { Pen, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'

function TodoItem({
  todoAtom,
  deleteTodo
}: {
  todoAtom: PrimitiveAtom<Todo>
  deleteTodo: (atom: PrimitiveAtom<Todo>, id: string) => Promise<void>
}) {
  const [todo, setTodo] = useAtom(todoAtom)
  return (
    <div
      key={todo.id}
      className={`bg-secondary transition-all overflow-hidden flex gap-8 ustify-between items-center  h-max pr-[3rem] pl-[1rem] py-[1rem] rounded-xl w-[52rem]`}
    >
      <div
        className={` font-extrabold flex-1 overflow-hidden flex items-center gap-8 text-left text-[2rem]`}
      >
        <Checkbox
          id={todo.id}
          checked={todo.completed}
          onCheckedChange={(checked: boolean) => setTodo({ ...todo, completed: checked })}
          className={`rounded-full cursor-pointer size-8 checked:border-primary border-2  border-primary transition-all`}
        />
        <div className={` flex-1 flex flex-col select-none font-semibold text-[2rem]`}>
          <div className="text-sm text-muted-foreground ">
            {format(todo.createdAt, 'eee -  H:MM ')}
          </div>
          <p
            className={cn(
              todo.completed && 'opacity-80  line-through',
              'w-full whitespace-pre-line'
            )}
          >
            {todo.content}
          </p>
        </div>
      </div>
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-row space-x-1 ml-auto w-max ">
          <Button
            variant="ghost"
            size="icon"
            // onClick={() => {
            //   setUpdateTodoId(todo.id)
            //   form.reset({
            //     content: todo.content,
            //     tag: todo.tag
            //   })
            //   setOpenDialog(true)
            // }}
            className="hover:text-blue-400 "
          >
            <Pen />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTodo(todoAtom, todo.id)}
            className="hover:text-red-400 "
          >
            <Trash />
          </Button>
        </div>

        <div
          className={cn('pl-[0.5rem] transition-all', todo.completed && 'scale-[1.3] text-primary')}
        >
          #{todo.tag}
        </div>
      </div>
    </div>
  )
}

export default TodoItem
