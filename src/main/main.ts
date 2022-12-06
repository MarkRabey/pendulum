/* eslint global-require: off, no-console: off, promise/always-return: off */
import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  Rectangle,
  shell,
  Tray,
} from 'electron';
import path from 'path';
import pkg from '../../package.json';
import formatTimer from '../shared/utils/formatTimer';
import './ipc';
import MenuBuilder from './menu';
import store, { STORE_KEYS } from './store';
import { resolveHtmlPath } from './util';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

ipcMain.handle('timer:update-tray', async () => {
  if (tray) {
    const settings = store.get(STORE_KEYS.SETTINGS);
    if (!settings.showInMenu) {
      tray.setTitle('');
    }
  }
});

ipcMain.handle('timer:set-time', async (_, time: number) => {
  if (tray) {
    const settings = store.get(STORE_KEYS.SETTINGS);
    if (settings.showInMenu) {
      tray.setTitle(formatTimer(time));
    } else {
      tray.setTitle('');
    }
  }
});

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

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
    width: 360,
    height: 560,
    show: false,
    webPreferences: {
      backgroundThrottling: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });
  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

const showWindow = () => {
  // const position = getWindowPosition();
  // // mainWindow?.setPosition(position.x, position.y, false);
  mainWindow?.show();
  mainWindow?.focus();
};

const createTray = () => {
  tray = new Tray(getAssetPath('icons/16x16.png'));
  tray.setToolTip('Pendulem');
  const menu = Menu.buildFromTemplate([
    {
      label: `Show`,
      click: showWindow,
    },
    {
      label: 'About',
      role: 'about',
    },
    { type: 'separator' },
    {
      label: 'Quit',
      role: 'quit',
    },
  ]);

  tray.setContextMenu(menu);

  // tray.on('right-click', () => {
  //   mainWindow?.hide();
  //   tray?.popUpContextMenu(menu);
  // });
  // tray.on('double-click', toggleWindow);
  // tray.on('click', (event) => {
  //   toggleWindow();
  //   if (mainWindow?.isVisible() && process.defaultApp && event.metaKey) {
  //     mainWindow.webContents.openDevTools({ mode: 'detach' });
  //   }
  // });
};

app.setAboutPanelOptions({
  applicationName: pkg.displayName,
  applicationVersion: pkg.version,
  version: pkg.version,
  website: 'https://markrabey.com',
  copyright: '© 2022 Mark Rabey',
});

app.on('ready', () => {
  createTray();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
