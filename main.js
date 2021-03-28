const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
var win
function createWindow () {
   win = new BrowserWindow({
    width: 400,
    height: 600,
      frame: false,
      show: false,
      resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
    
    win.on('ready-to-show', function() {
      win.show();
      win.focus();
  });

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on("toMain", (_, args) => {
    if (args == "min") {
        win.minimize();
    } else if(args == 'close') {
        win.close();
  }
});