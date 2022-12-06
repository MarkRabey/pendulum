/* eslint global-require: off, no-console: off, promise/always-return: off */
import { app, BrowserWindow, Rectangle, shell, Tray } from 'electron';
import path from 'path';
import './ipc';
import { resolveHtmlPath } from './util';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const getWindowPosition = () => {
  const windowBounds: Rectangle = mainWindow
    ? mainWindow?.getBounds()
    : { x: 0, y: 0, width: 16, height: 16 };

  const trayBounds: Rectangle = tray
    ? tray.getBounds()
    : { x: 0, y: 0, width: 16, height: 16 };

  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );

  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x, y };
};

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    width: 300,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      backgroundThrottling: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });
  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('blur', () => {
    if (!mainWindow?.webContents.isDevToolsOpened()) {
      mainWindow?.hide();
    }
  });

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

const showWindow = () => {
  const position = getWindowPosition();
  mainWindow?.setPosition(position.x, position.y, false);
  mainWindow?.show();
  mainWindow?.focus();
};

const toggleWindow = () => {
  if (mainWindow?.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
};

const createTray = () => {
  tray = new Tray(getAssetPath('icons/16x16.png'));
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', (event) => {
    toggleWindow();
    if (mainWindow?.isVisible() && process.defaultApp && event.metaKey) {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });
};

app.dock.hide();

app.on('ready', () => {
  createTray();
  createWindow();
});

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  app.quit();
  // }
});
