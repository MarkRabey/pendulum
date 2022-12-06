import Store, { Schema } from 'electron-store';

export interface SettingsData {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  showInMenu: boolean;
}

export type SchemaType = {
  settings: SettingsData;
};

const schema: Schema<SchemaType> = {
  settings: {
    type: 'object',
    properties: {
      pomodoroTime: { type: 'number', default: 1500 },
      shortBreakTime: { type: 'number', default: 300 },
      longBreakTime: { type: 'number', default: 900 },
      longBreakInterval: { type: 'number', default: 4 },
      autoStartBreaks: { type: 'boolean', default: false },
      autoStartPomodoros: { type: 'boolean', default: false },
      showInMenu: { type: 'boolean', default: false },
    },
    required: [
      'pomodoroTime',
      'shortBreakTime',
      'longBreakTime',
      'longBreakInterval',
      'autoStartBreaks',
      'autoStartPomodoros',
      'showInMenu',
    ],
    additionalProperties: false,
  },
};

export const STORE_KEYS: { [key: string]: keyof SchemaType } = {
  SETTINGS: 'settings',
};

const store = new Store<SchemaType>({ schema });

export default store;
