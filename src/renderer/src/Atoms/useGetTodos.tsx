import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
export const todoList = atom<Todo[]>([])
const useGetTodos = () => {
  const [_, setMaTodos] = useAtom(todoList)
  useEffect(() => {
    const fun = async () => {
      const res = await window.api.gettingTododsList()

      setMaTodos(res)
    }
    fun()
  }, [])
}

export default useGetTodos
