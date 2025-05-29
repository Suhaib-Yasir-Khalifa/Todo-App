import { todoList } from '@/Atoms/useGetTodos'
import { useSetAtom } from 'jotai'

const updateTodo = async (id: string, updatedVAlue: Partial<Todo>) => {
  const setTodo = useSetAtom(todoList)
  await window.api.updateTodo(id, updatedVAlue)
  setTodo((prev) => {
    const update = prev.map((todo) => {
      if (id === todo.id) {
        return { ...todo, ...updatedVAlue }
      }
      return todo
    })
    return update
  })
}

export default updateTodo
