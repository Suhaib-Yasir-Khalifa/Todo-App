import { useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import { todosAtom, todoAtomsAtom } from '@/state/todos'
import { PrimitiveAtom, useAtom, useSetAtom } from 'jotai'

/**_____________________________________________________________ */

export default function useTodos() {
  const setTodos = useSetAtom(todosAtom)
  const [toodsAtoms, dispatch] = useAtom(todoAtomsAtom)

  useEffect(() => {
    const fun = async () => {
      const res = await window.api.gettingTododsList()
      setTodos(res)
    }
    fun()
    // eslint-disable-next-line
  }, [])
  // eslint-disable-next-line
  const addTodo = useCallback(
    debounce(
      async (todo: Omit<Todo, 'id'>) => {
        const newTodo = await window.api.addTodo(todo)
        dispatch({ type: 'insert', value: newTodo })
      },
      500,
      { leading: true, trailing: false }
    ),

    []
  )

  async function deleteTodo(atom: PrimitiveAtom<Todo>, id: string) {
    await window.api.deleteTodo(id)
    dispatch({ type: 'remove', atom })
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
    toodsAtoms,
    addTodo,
    deleteTodo,
    updateTodo
  }
}
