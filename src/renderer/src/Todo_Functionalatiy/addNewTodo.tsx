import { debounce } from 'lodash'
import { useCallback } from 'react'
import { todoList } from '../Atoms/useGetTodos'
import { useSetAtom } from 'jotai'

const addNewTodo = (todo: Omit<Todo, 'id'>) => {
  const settingMaTodo = useSetAtom(todoList)
  useCallback(() => {
    debounce(
      async () => {
        const newTodo = await window.api.addTodo(todo)
        settingMaTodo((prev) => [newTodo, ...prev])
      },
      500,
      { leading: true, trailing: false }
    )
  }, [])
}

export default addNewTodo
