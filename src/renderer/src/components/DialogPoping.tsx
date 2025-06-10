import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {} from 'jotai/utils'

const mySchema = z.object({
  tag: z.string().min(1).max(10),
  content: z.string().min(1)
})

function DialogPoping({
  children,
  addTodo,
  todo,
  setTodo
}: {
  children: React.ReactNode
  addTodo?: (todo: Omit<Todo, 'id'>) => void
  todo?: Todo
  setTodo?: React.Dispatch<React.SetStateAction<Todo>>
}) {
  const [openDialog, setOpenDialog] = useState(false)

  const form = useForm<z.infer<typeof mySchema>>({
    resolver: zodResolver(mySchema),
    defaultValues: {
      content: '',
      tag: ''
    }
  })

  async function onSubmit(values: z.infer<typeof mySchema>) {
    console.log(values)
    if (todo && setTodo) {
      console.log('updateing with ', { ...todo, ...values })
      setTodo({ ...todo, ...values })
    } else {
      if (!addTodo) throw new Error('provie addtod')
      addTodo({ ...values, completed: false, createdAt: new Date().getTime() })
    }
    setOpenDialog(false)
  }

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
    else if (openDialog && todo)
      form.reset({
        tag: todo.tag,
        content: todo.content
      })
  }, [form, openDialog, todo])

  return (
    <div>
      {' '}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {todo ? 'Update Your Todo' : 'Add Your Todo'}
            </DialogTitle>
            <DialogDescription>
              {todo ? 'U can always change the plan' : 'Add new missions, be better'}
            </DialogDescription>
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
                <Button type="submit">{todo ? 'Update Todo' : 'Add Todo'}</Button>
                {/* </DialogClose> */}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DialogPoping
