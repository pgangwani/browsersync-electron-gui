'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
//const electron = require('electron');
const ipcMain = require('ipc');
const Menu = require("menu");


// report crashes to the Electron project
require('crash-reporter').start();


const bs = require('browser-sync').create();

//console.log(bs);
var indexFile = `${__dirname}/index.html`;

if (process.env['NODE_ENV'] == 'dev') {
    indexFile = "http://localhost:9999";
    
        // adds debug features like hotkeys for triggering dev tools and reload
        require('electron-debug')();
}


// prevent window being garbage collected
let mainWindow;

function onClosed() {
    // dereference the window
    // for multiple windows store them in an array
    mainWindow = null;
}

function createMainWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 300
    });
    // You may toggle comment based on your environment
    //win.openDevTools();


    if (process.env['NODE_ENV'] == 'dev') {
        // we need to wait until browsersync is ready
        setTimeout(function() {
            win.loadUrl(indexFile);
        }, 5000);
    } else {
        win.loadUrl(`file:${indexFile}`);
    }


    win.on('closed', onClosed);
    // Create the Application's main menu
    const template = [{
        label: "Sync Tester",
        submenu: [
            { label: "About Sync Tester App", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    
    
    return win;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        console.log('app quits');
    }
    console.log('app quits');
});

app.on('activate-with-no-open-windows', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});

ipcMain.on('closeWindow', function(event, arg) {
        var currentWin = BrowserWindow.getFocusedWindow();
      if(currentWin)
        currentWin.close();
        //console.log(currentWin);
        event.sender.send('closeWindow-reply', 'window Closed');
});


// toggle server 
ipcMain.on('toggleServer', function(event, arg) {
    //console.log('before', bs.active);
    //console.log(arg);
    if (!bs.active && arg.command == 'start') {
        // no server started so lets start
        bs.init({
            // server:true,
            proxy: arg.url,
            browser: arg.selectedBrowsers || undefined,
            logPrefix: "My Sync tester Project",
            reloadOnRestart: true,
            notify: true,
            open: "external",
            ghostMode: {
				clicks: true,
				location: false,
				forms: true,
				scroll: true
			}

        }, function(err, bs) {
            //console.log('bs-active', bs.active);
            if (bs.active) {

            }
            event.sender.send('toggleServer-reply', 'started', 'WOW!!! Browsersync is running now!',bs);
        });
    }
    else if (arg.command == 'stop') {
        //console.log('server is going to stop');
            bs.exit(function() {
                //console.log('server stopped');
            });
            event.sender.send('toggleServer-reply', 'stopped', 'Browsersync is stopped!!',bs);

    }

});





