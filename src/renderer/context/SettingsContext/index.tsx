import { SettingsData } from 'main/store';
import { createContext, useContext, useEffect, useState } from 'react';

export type SettingsContextType = {
  pomodoroMode: boolean;
  handleSetPomodoroMode: (value: boolean) => void;
  pomodoroCooldown: boolean;
  handleSetPomodoroCooldown: (value: boolean) => void;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pomodoroMode, setPomodoroMode] = useState(false);
  const [pomodoroInterval, setPomodoroInterval] = useState(1500);
  const [pomodoroBreakInterval, setPomodoroBreakInterval] = useState(300);
  const [pomodoroCooldown, setPomodoroCooldown] = useState(false);

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
    setPomodoroMode(settings.pomodoroMode);
    setPomodoroInterval(settings.pomodoroInterval);
    setPomodoroBreakInterval(settings.pomodoroBreakInterval);
  };

  const handleSetPomodoroMode = (value: boolean) => {
    setPomodoroMode(value);
    saveSetting('pomodoroMode', value);
  };

  const handleSetPomodoroCooldown = (value: boolean) => {
    setPomodoroCooldown(value);
  };

  useEffect(() => {
    getSavedSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        pomodoroMode,
        handleSetPomodoroMode,
        pomodoroCooldown,
        handleSetPomodoroCooldown,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

export const useSettignsContext = () => {
  const contextValues = useContext(SettingsContext) as SettingsContextType;

  return {
    ...contextValues,
  };
};
