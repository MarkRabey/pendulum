import { Channels } from 'main/preload';
import { SettingsData } from 'main/store';

declare global {
  interface Window {
    electron: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      storeSettings: (setting: SettingsData) => Promise<SettingsData>;
      getSettings: () => Promise<SettingsData>;
      saveSetting: ({
        key,
        value,
      }: {
        key: string;
        value: any;
      }) => Promise<void>;
      ipcRenderer: {
        [x: string]: any;
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
