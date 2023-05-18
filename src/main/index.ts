import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import os from 'os'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { SerialPort, ReadlineParser } from 'serialport'
import Store from 'electron-store'

const MESSAGES = {
  'error-title': 'Hata!'
}

let serialPort2: SerialPort = new SerialPort({ path: 'COM3', baudRate: 9600 })
let serialPort: SerialPort | null
let parser: any

const store = new Store()

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  const printWindow = new BrowserWindow({
    parent: mainWindow,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  const openSerialPort = async (path: string) => {
    const portList = await SerialPort.list()
    const port = portList.find((val) => val.path.toLocaleLowerCase() === path.toLocaleLowerCase())

    if (!port) {
      dialog.showErrorBox(MESSAGES['error-title'], `${path} port'u bulunamadı!`)
      return
    }

    serialPort = new SerialPort({
      path,
      baudRate: 9600,
      autoOpen: true
    })
    parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n\n\n' }))

    serialPort.on('open', () => {
      dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'Başarılı',
        message: `${path} port bağlantısı başarılı.`
      })
    })

    parser?.on('data', (received) => {
      const regex = /[-+]?\d*\.\d+|\d+/g
      const matches = received.toString().match(regex)

      console.log(matches)

      mainWindow.webContents.send('scale-data-template', received.toString())
      if (matches && matches.length === 4) {
        const data = {
          net: parseFloat(matches[0]),
          dara: parseFloat(matches[3])
        }

        if (data.dara <= 0.1) {
          return dialog.showErrorBox('Hata', 'Dara Verisi Hatalı veya Girilmemiş')
        }

        mainWindow.webContents.send('scale-data', data)
      } else {
        dialog.showErrorBox(
          MESSAGES['error-title'],
          'Teraziden gelen veri hatalı, darayı kontrol ediniz.'
        )
      }
    })

    /* serialPort.on('data', (received: string) => {
      const regex = /[-+]?\d*\.\d+|\d+/g
      const matches = received.toString().match(regex)

      setTimeout(() => {}, 900)

      mainWindow.webContents.send('scale-data-template', received.toString())
      if (matches && matches.length === 4) {
        const data = {
          net: parseFloat(matches[0]),
          dara: parseFloat(matches[3])
        }

        if (data.dara <= 0.1) {
          return dialog.showErrorBox('Hata', 'Dara Verisi Hatalı veya Girilmemiş')
        }

        mainWindow.webContents.send('scale-data', data)
      }
    }) */
  }

  ipcMain.on('connect-com-port', (_, data: string) => {
    if (serialPort && serialPort.isOpen) {
      serialPort.close()
    }

    openSerialPort(data)
  })

  ipcMain.handle('get-serial-ports', async () => {
    const portLists = await SerialPort.list()

    return portLists
  })

  ipcMain.on('send-serial-data', (_, data: string) => {
    serialPort2.write(data)
  })

  ipcMain.handle('get-active-port', () => serialPort)

  ipcMain.handle('get-host-name', () => os.userInfo().username)

  ipcMain.handle('set-config', (_, data: any) => {
    const { key, data: el } = data

    store.set(key, el)

    return true
  })

  ipcMain.handle('get-config', (_, key: string) => store.get(key))

  ipcMain.on('print-label', (_, data) => {
    printWindow.webContents.send('print-label', data)

    setTimeout(() => {
      printWindow.webContents.print({
        silent: true,
        printBackground: true,
        deviceName: 'TSC TE210'
      })
    }, 500)
  })

  mainWindow.on('ready-to-show', async () => {
    mainWindow.show()
    mainWindow.maximize()
    openSerialPort('COM2')
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  printWindow.webContents.addListener('did-finish-load', () => {
    /*  printWindow.webContents.print({
      silent: true,
      printBackground: true,
      deviceName: 'TSC TE210 (Kopya 1)'
    }) */
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    printWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#/print')
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    printWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: '#/print'
    })
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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here

// Tüm seriportları listeler ve geri döndürür.
