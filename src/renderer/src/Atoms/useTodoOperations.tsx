import { useAtom } from 'jotai'
import { todoList } from './useGetTodos'
import useGetTodos from './useGetTodos'
import { debounce } from 'lodash'
import { useCallback } from 'react'
export default function useTodoOperations() {
  useGetTodos()

  const [todo, setTodo] = useAtom(todoList)

  const addTodo = useCallback(
    debounce(
      async (todo: Omit<Todo, 'id'>) => {
        const newTodo = await window.api.addTodo(todo)
        setTodo((prev) => [newTodo, ...prev])
      },
      500,
      { leading: true, trailing: false }
    ),
    []
  )

  async function deleteTodo(id: string) {
    await window.api.deleteTodo(id)
    setTodo(todo.filter((todo) => todo.id !== id))
  }

  async function updateTodo(id: string, updatedVAlue: Partial<Todo>) {
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

  return { addTodo, updateTodo, deleteTodo }
}
