import Store, { Schema } from 'electron-store';

export interface SettingsData {
  pomodoroMode: boolean;
  pomodoroInterval: number;
  pomodoroBreakInterval: number;
}

export type SchemaType = {
  settings: SettingsData;
};

const schema: Schema<SchemaType> = {
  settings: {
    type: 'object',
    properties: {
      pomodoroMode: { type: 'boolean', default: false },
      pomodoroInterval: { type: 'number', default: 1500 },
      pomodoroBreakInterval: { type: 'number', default: 300 },
    },
    required: ['pomodoroMode', 'pomodoroInterval', 'pomodoroBreakInterval'],
    additionalProperties: false,
  },
};

export const STORE_KEYS: { [key: string]: keyof SchemaType } = {
  SETTINGS: 'settings',
};

const store = new Store<SchemaType>({ schema });

export default store;
