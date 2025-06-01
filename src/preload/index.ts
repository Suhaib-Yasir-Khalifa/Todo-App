import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
// Custom APIs for renderer

const todos = {
  gettingTododsList: (): Promise<Todo[]> => ipcRenderer.invoke('get-todos'),
  addTodo: (todo: Omit<Todo, 'id'>): Promise<Todo> => ipcRenderer.invoke('add-todo', todo),
  deleteTodo: (id: string) => ipcRenderer.invoke('delete-todo', id),
  updateTodo: (id: string, update: Partial<Todo>) => ipcRenderer.invoke('update-todo', id, update)
}

// store methods
const store = {
  get(key: string): any {
    return ipcRenderer.sendSync('electron-store-get', key)
  },
  set(property: string, val: any) {
    ipcRenderer.send('electron-store-set', property, val)
  },

  remove(key: string): any {
    ipcRenderer.send('electron-store-remove', key)
  }
}

const api = {
  todos,
  store
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

export type ApiHandler = typeof api
