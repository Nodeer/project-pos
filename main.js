const electron = require('electron');
var serialNumber = require('serial-number');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
function createWindow () {
  mainWindow = new BrowserWindow({width: 600, height: 800})
  mainWindow.loadURL('file://'+__dirname+'/index.html')
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  serialNumber(function (err, value) {
  	console.log(err+':::'+value);
  });
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
