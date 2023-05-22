import { SerialPort, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

declare global {
  interface IPortInfo {
    path: string
    manufacturer: string | undefined
    serialNumber: string | undefined
    pnpId: string | undefined
    locationId: string | undefined
    productId: string | undefined
    vendorId: string | undefined
  }
  interface IResponse {
    status: 'error' | 'success' | 'info' | 'warning'
    message: string
  }
  interface ISlipStatus {
    ok: boolean
    error: string | null
    seriNo: string
  }
}

export interface IApi {
  getSerialPorts: () => Promise<IPortInfo[]>
  getHostName: () => Promise<string>
  getCurrentPort: () => Promise<SerialPort | null>
  getSettingsValue: <T>(key: string) => Promise<T | undefined | null>
}

// Custom APIs for renderer
const api: IApi = {
  getSerialPorts: async () => await ipcRenderer.invoke('get-serial-ports'),
  getHostName: async () => await ipcRenderer.invoke('get-host-name'),
  getCurrentPort: async () => await ipcRenderer.invoke('get-active-port'),
  getSettingsValue: async (key: string) => await ipcRenderer.invoke('get-config', key)
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
