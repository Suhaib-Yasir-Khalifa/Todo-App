import { useCallback } from 'react'
import { debounce } from 'lodash'
import { todoAtomsAtom } from '@/state/todos'
import { PrimitiveAtom, useAtom } from 'jotai'

/**_____________________________________________________________ */

export default function useTodos() {
  const [toodsAtoms, dispatch] = useAtom(todoAtomsAtom)

  // eslint-disable-next-line
  const addTodo = useCallback(
    debounce(
      async (todo: Omit<Todo, 'id'>) => {
        const id = crypto.randomUUID()
        const newTodo = { ...todo, id, completed: false }
        dispatch({ type: 'insert', value: newTodo })
      },
      500,
      { leading: true, trailing: false }
    ),

    []
  )

  async function deleteTodo(atom: PrimitiveAtom<Todo>) {
    dispatch({ type: 'remove', atom })
  }

  return {
    toodsAtoms,
    addTodo,
    deleteTodo
  }
}
