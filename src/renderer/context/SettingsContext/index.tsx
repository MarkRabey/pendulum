import { SettingsData } from 'main/store';
import { createContext, useContext, useEffect, useState } from 'react';

export type SettingsContextType = {
  autoStartPomodoros: boolean;
  handleSetAutoStartPomodoros: (value: boolean) => void;
  autoStartBreaks: boolean;
  handleSetAutoStartBreaks: (value: boolean) => void;
  pomodoroTime: number;
  handleSetPomodoroTime: (value: number) => void;
  shortBreakTime: number;
  handleSetShortBreakTime: (value: number) => void;
  longBreakTime: number;
  handleSetLongBreakTime: (value: number) => void;
  longBreakInterval: number;
  handleSetLongBreakInterval: (value: number) => void;
  showInMenu: boolean;
  handleSetShowInMenu: (value: boolean) => void;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(1500);
  const [shortBreakTime, setShortBreakTime] = useState(300);
  const [longBreakTime, setLongBreakTime] = useState(300);
  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const [showInMenu, setShowInMenu] = useState(false);

  const saveSetting = async (
    key: keyof SettingsData,
    value: boolean | number
  ) => {
    await window.electron.saveSetting({
      key,
      value,
    });
  };

  const getSavedSettings = async () => {
    const settings = await window.electron.getSettings();
    if (settings) {
      setAutoStartPomodoros(settings.autoStartPomodoros);
      setAutoStartBreaks(settings.autoStartBreaks);
      setPomodoroTime(settings.pomodoroTime);
      setShortBreakTime(settings.shortBreakTime);
      setLongBreakTime(settings.longBreakTime);
      setLongBreakInterval(settings.longBreakInterval);
      setShowInMenu(settings.showInMenu);
    }
  };

  const handleSetAutoStartPomodoros = (value: boolean) => {
    setAutoStartPomodoros(value);
    saveSetting('autoStartPomodoros', value);
  };

  const handleSetAutoStartBreaks = (value: boolean) => {
    setAutoStartBreaks(value);
    saveSetting('autoStartBreaks', value);
  };

  const handleSetPomodoroTime = (value: number) => {
    setPomodoroTime(value);
    saveSetting('pomodoroTime', value);
  };

  const handleSetShortBreakTime = (value: number) => {
    setShortBreakTime(value);
    saveSetting('shortBreakTime', value);
  };

  const handleSetLongBreakTime = (value: number) => {
    setLongBreakTime(value);
    saveSetting('longBreakTime', value);
  };

  const handleSetLongBreakInterval = (value: number) => {
    setLongBreakInterval(value);
    saveSetting('longBreakInterval', value);
  };

  const handleSetShowInMenu = (value: boolean) => {
    setShowInMenu(value);
    saveSetting('showInMenu', value);
  };

  useEffect(() => {
    getSavedSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        autoStartPomodoros,
        handleSetAutoStartPomodoros,
        autoStartBreaks,
        handleSetAutoStartBreaks,
        pomodoroTime,
        handleSetPomodoroTime,
        shortBreakTime,
        handleSetShortBreakTime,
        longBreakTime,
        handleSetLongBreakTime,
        longBreakInterval,
        handleSetLongBreakInterval,
        showInMenu,
        handleSetShowInMenu,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

export const useSettingsContext = () => {
  const contextValues = useContext(SettingsContext) as SettingsContextType;

  return {
    ...contextValues,
  };
};
