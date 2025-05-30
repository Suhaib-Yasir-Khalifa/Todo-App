import {
  Dialog,
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

const mySchema = z.object({
  tag: z.string().min(1).max(10),
  content: z.string().min(1)
})

function DialogPoping() {
  const [openDialog, setOpenDialog] = useState(false)
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

  return (
    <div>
      {' '}
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
  )
}

export default DialogPoping
