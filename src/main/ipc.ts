import { ipcMain, Notification } from 'electron';
import store, { SettingsData, STORE_KEYS } from './store';

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

interface NotificationOptions {
  title?: string;
  message: string;
}

ipcMain.on(
  'notify',
  (_, { title = 'Pedulum', message }: NotificationOptions) => {
    new Notification({ title, body: message }).show();
  }
);

ipcMain.handle(
  'send-message',
  (_, { title = 'Pedulum', message }: NotificationOptions) => {
    new Notification({ title, body: message }).show();
  }
);

ipcMain.handle(
  'store:saveSetting',
  async (_, { key, value }: { key: keyof SettingsData; value: any }) => {
    const currentSettings = store.get(STORE_KEYS.SETTINGS);
    store.set(STORE_KEYS.SETTINGS, {
      ...currentSettings,
      [key]: value,
    });
  }
);

ipcMain.handle(
  'store:settings',
  async (_, newSettings: Partial<SettingsData>) => {
    const prevSettings = store.get(STORE_KEYS.SETTINGS);
    const result = store.set(STORE_KEYS.SETTINGS, {
      ...prevSettings,
      ...newSettings,
    });

    return result;
  }
);
