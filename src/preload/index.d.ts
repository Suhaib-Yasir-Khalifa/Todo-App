import { ElectronAPI } from '@electron-toolkit/preload'
import { ApiHandler } from "./index"
declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiHandler
  }
}
