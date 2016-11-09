const electron = require('electron');
const {app, BrowserWindow, Menu, Tray} = electron;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1070, height: 570,'minHeight': 500,'minWidth': 600,icon: __dirname + '/icon.ico',frame: false });

  var platform = require('os').platform();
  var iconIdle = __dirname +'/img/icons/icon.png';
  if (platform == 'darwin') {
    iconIdle = __dirname +'/img/icons/icon.png';
  } else if (platform == 'win32') {
    iconIdle = __dirname +'/img/icons/icon.ico';
  }

  tray = new Tray(iconIdle);
  if (platform == "darwin") {
      tray.setPressedImage(__dirname + '/img/icons/icon.png');
  }

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  });
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Show', click() {     mainWindow.show()}},
    {label: 'Close', click() {     mainWindow.close()}}
   ]);
   tray.setToolTip('BySound')
   tray.setContextMenu(contextMenu)
  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  });
  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  });


  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.setMenu(null);
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
