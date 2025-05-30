import { useEffect, useCallback, useState } from 'react'
import { debounce } from 'lodash'
import { todosAtom } from '@/state/todos'
import { useAtom } from 'jotai'
/**_____________________________________________________________ */

export default function useTodos() {
  const [todos, setTodos] = useAtom(todosAtom)
  useEffect(() => {
    const fun = async () => {
      const res = await window.api.gettingTododsList()
      setTodos(res)
    }
    fun()
  }, [])

  const addTodo = useCallback(
    debounce(
      async (todo: Omit<Todo, 'id'>) => {
        const newTodo = await window.api.addTodo(todo)
        setTodos((prev) => [newTodo, ...prev])
      },
      500,
      { leading: true, trailing: false }
    ),

    []
  )

  async function deleteTodo(id: string) {
    await window.api.deleteTodo(id)
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  async function updateTodo(id: string, updatedValue: Partial<Todo>) {
    await window.api.updateTodo(id, updatedValue)
    setTodos((prev) => {
      const update = prev.map((todo) => {
        if (id === todo.id) {
          return { ...todo, ...updatedValue }
        }
        return todo
      })
      return update
    })
  }

  return {
    todos,
    addTodo,
    deleteTodo,
    updateTodo
  }
}
