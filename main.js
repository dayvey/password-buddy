const path = require('path');
const { app, BrowserWindow } = require('electron');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

function createMainWindow()
{
    const mainWindow = new BrowserWindow({
        title: 'Password Buddy',
        width: isDev ? 1000 : 500,
        height: 800
    });

    // Open devtools if in dev env
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow()
        }
    })

    createMainWindow();
});

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })