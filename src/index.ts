'use strict'

import { app, BrowserWindow } from 'electron'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */

let mainWindow: Electron.BrowserWindow

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })


  mainWindow.loadURL(`file://${app.getAppPath()}/index.html`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
  if (process.env.NODE_ENV === 'development') {
    installExtension(VUEJS_DEVTOOLS).
      then((name:string) => console.log(`Added Extension:  ${name}`)).
      catch((err:string) => console.log('An error occurred: ', err));
  }
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Open dev tools initially when in development mode


