import { SettingsData } from 'main/store';
import { createContext, useContext, useEffect, useState } from 'react';

export type SettingsContextType = {
  pomodoroMode: boolean;
  handleSetPomodoroMode: (value: boolean) => void;
  pomodoroInterval: number;
  handleSetPomodoroInterval: (value: number) => void;
  pomodoroBreakInterval: number;
  handleSetPomodoroBreakInterval: (value: number) => void;
  showInMenu: boolean;
  handleSetShowInMenu: (value: boolean) => void;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pomodoroMode, setPomodoroMode] = useState(false);
  const [pomodoroInterval, setPomodoroInterval] = useState(1500);
  const [pomodoroBreakInterval, setPomodoroBreakInterval] = useState(300);
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
    setPomodoroMode(settings.pomodoroMode);
    setPomodoroInterval(settings.pomodoroInterval);
    setPomodoroBreakInterval(settings.pomodoroBreakInterval);
    setShowInMenu(settings.showInMenu);
  };

  const handleSetPomodoroMode = (value: boolean) => {
    setPomodoroMode(value);
    saveSetting('pomodoroMode', value);
  };

  const handleSetPomodoroInterval = (value: number) => {
    setPomodoroInterval(value);
    saveSetting('pomodoroInterval', value);
  };

  const handleSetPomodoroBreakInterval = (value: number) => {
    setPomodoroBreakInterval(value);
    saveSetting('pomodoroBreakInterval', value);
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
        pomodoroMode,
        handleSetPomodoroMode,
        pomodoroInterval,
        handleSetPomodoroInterval,
        pomodoroBreakInterval,
        handleSetPomodoroBreakInterval,
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
