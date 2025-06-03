import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import ElectronStore from 'electron-store'

const store = new ElectronStore({
  defaults: {
    'todos-list': []
  }
})

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#262422',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC

  // Store
  ipcMain.on('electron-store-get', async (event, val) => {
    event.returnValue = store.get(val) || null
  })

  ipcMain.on('electron-store-set', async (_, key, val) => {
    store.set(key, val)
  })

  ipcMain.on('electron-store-remove', async (_, key) => {
    store.delete(key)
  })

  // Todos
  ipcMain.handle('add-todo', (_event, obj: Todo) => {
    const prev: Todo[] = store.get('todos-list')

    store.set('todos-list', [obj, ...prev])
    return obj
  })

  ipcMain.handle('get-todos', async () => {
    const data = store.get('todos-list')

    return data
  })

  ipcMain.handle('delete-todo', (_, id) => {
    const prev: Todo[] = store.get('todos-list')

    const update = prev.filter((todo) => todo.id !== id)

    store.set('todos-list', update)
  })

  ipcMain.handle('set-todo', (_, id, target) => {
    const prev: Todo[] = store.get('todos-list')
    const update = prev.map((todo) => {
      if (todo.id === id) {
        return target
      }
      return todo
    })
    store.set('todos-list', update)
  })

  ipcMain.handle('update-todo', (_, id, updaetdValues) => {
    const prev: Todo[] = store.get('todos-list')
    const update = prev.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...updaetdValues }
      }
      return todo
    })
    store.set('todos-list', update)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
