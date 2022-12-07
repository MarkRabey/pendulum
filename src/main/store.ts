import { Rectangle } from 'electron';
import Store, { Schema } from 'electron-store';

export interface WindowData {
  bounds: Rectangle;
}

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
  window: WindowData;
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
  window: {
    type: 'object',
    properties: {
      bounds: {
        type: 'object',
        properties: {
          width: { type: 'number', default: 460 },
          height: { type: 'number', default: 800 },
          x: { type: 'number', default: 0 },
          y: { type: 'number', default: 0 },
        },
      },
    },
  },
};

export const STORE_KEYS: { [key: string]: keyof SchemaType } = {
  SETTINGS: 'settings',
};

const store = new Store<SchemaType>({ schema });

export default store;
