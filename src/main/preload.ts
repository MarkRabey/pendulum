import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { SettingsData } from './store';

export type Channels =
  | 'ipc-example'
  | 'notify'
  | 'open-preferences'
  | 'close-preferences';

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message: string) {
      ipcRenderer.send('notify', message);
    },
  },
  minimize: () => ipcRenderer.invoke('app:minimize'),
  maximize: () => ipcRenderer.invoke('app:maximize'),
  close: () => ipcRenderer.invoke('app:close'),
  setTime: (time: number) => ipcRenderer.invoke('timer:set-time', time),
  sendMessage: (message: string) =>
    ipcRenderer.invoke('send-message', { message }),
  storeSettings: async (settings: SettingsData) =>
    ipcRenderer.invoke('store:settings', settings),
  saveSetting: async ({ key, value }: { key: string; value: any }) =>
    Promise.all([
      ipcRenderer.invoke('store:saveSetting', { key, value }),
      ipcRenderer.invoke('timer:update-tray'),
    ]),
  getSettings: async () => ipcRenderer.invoke('store:getSettings'),
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
