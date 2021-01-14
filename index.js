const { app, BrowserWindow } = require('electron');
const createDesktopShortcut = require('create-desktop-shortcuts');

const name = "transparency";


function createWindow() {
    let win = new BrowserWindow({
        width: 900,
        height: 550,
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + '/site/favicon.ico'
    })

    win.loadFile('site/index.html');

    win.setMenu(null);
}

app.on('ready', createWindow)