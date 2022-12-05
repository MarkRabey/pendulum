import { createContext, useContext, useState } from 'react';

export type SettingsContextType = {
  pomodoroMode: boolean;
  handleSetPomodoroMode: (value: boolean) => void;
  pomodoroCooldown: boolean;
  handleSetPomodoroCooldown: (value: boolean) => void;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pomodoroMode, setPomodoroMode] = useState(false);
  const [pomodoroCooldown, setPomodoroCooldown] = useState(false);

  const handleSetPomodoroMode = (value: boolean) => {
    setPomodoroMode(value);
  };

  const handleSetPomodoroCooldown = (value: boolean) => {
    setPomodoroCooldown(value);
  };

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
