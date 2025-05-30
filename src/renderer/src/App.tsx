import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import { Moon, Pen, Sun, Trash } from 'lucide-react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Checkbox } from './components/ui/checkbox'
import { cn } from './lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { format } from 'date-fns'
import { useAtomValue } from 'jotai'
import useTodos from './hooks/useTodo'

/**____________________________________________________
 *
 */

const mySchema = z.object({
  tag: z.string().min(1).max(10),
  content: z.string().min(1)
})
function App(): React.JSX.Element {
  const [isDark, setIsDark] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [updateTodoId, setUpdateTodoId] = useState<string | null>(null)
  const { todos, addTodo, deleteTodo, updateTodo } = useTodos()

  const form = useForm<z.infer<typeof mySchema>>({
    resolver: zodResolver(mySchema),
    defaultValues: {
      content: '',
      tag: ''
    }
  })

  async function onSubmit(values: z.infer<typeof mySchema>) {
    if (updateTodoId) await updateTodo(updateTodoId, values)
    else {
      await addTodo({ ...values, completed: false, createdAt: new Date().getTime() })
    }

    setOpenDialog(false)
  }

  useEffect(() => {
    if (isDark) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [isDark])

  useEffect(() => {
    // clearing the form state on close
    if (!openDialog)
      setTimeout(
        () =>
          form.reset({
            tag: '',
            content: ''
          }),
        300
      )
  }, [openDialog])

  const taskeCompleted = (checked: boolean, item: Todo) => {
    updateTodo(item.id, { completed: checked })
  }

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
          <div className="font-bold text-[2.1rem]  ">Let's Create Discipline</div>
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
          <div className="w-full h-max flex flex-col">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    {updateTodoId ? 'Update Your Todo' : 'Add Your Todo'}
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="tag"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Tag" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Content" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      {/* <DialogClose asChild> */}
                      <Button
                        type="submit"

                        // disabled={tagValue.trim() === '' || content.trim() === ''}
                        // onClick={() => {
                        //   if (updateTodoId) editTode()
                        //   else handleNewObj()
                        // }}
                      >
                        {updateTodoId ? 'Update Todo' : 'Add Todo'}
                      </Button>
                      {/* </DialogClose> */}
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
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
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`bg-secondary transition-all overflow-hidden flex gap-8 ustify-between items-center  h-max pr-[3rem] pl-[1rem] py-[1rem] rounded-xl w-[52rem]`}
                >
                  <div
                    className={` font-extrabold flex-1 overflow-hidden flex items-center gap-8 text-left text-[2rem]`}
                  >
                    <Checkbox
                      id={item.id}
                      checked={item.completed}
                      onCheckedChange={(checked: boolean) => taskeCompleted(checked, item)}
                      className={`rounded-full cursor-pointer size-8 checked:border-primary border-2  border-primary transition-all`}
                    />
                    <div className={` flex-1 flex flex-col select-none font-semibold text-[2rem]`}>
                      <div className="text-sm text-muted-foreground ">
                        {format(item.createdAt, 'eee -  H:MM ')}
                      </div>
                      <p
                        className={cn(
                          item.completed && 'opacity-80  line-through',
                          'w-full whitespace-pre-line'
                        )}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-row space-x-1 ml-auto w-max ">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setUpdateTodoId(item.id)
                          form.reset({
                            content: item.content,
                            tag: item.tag
                          })
                          setOpenDialog(true)
                        }}
                        className="hover:text-blue-400 "
                      >
                        <Pen />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTodo(item.id)}
                        className="hover:text-red-400 "
                      >
                        <Trash />
                      </Button>
                    </div>

                    <div
                      className={cn(
                        'pl-[0.5rem] transition-all',
                        item.completed && 'scale-[1.3] text-primary'
                      )}
                    >
                      #{item.tag}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
