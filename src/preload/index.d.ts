import { ElectronAPI } from '@electron-toolkit/preload'
import { IApi } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: IApi
  }
}
