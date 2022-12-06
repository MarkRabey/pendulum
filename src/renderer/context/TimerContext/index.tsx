import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import notifications from 'renderer/utils/notifications';
import { useSettingsContext } from '../SettingsContext';

export type TimerContextType = {
  time: number;
  timerRunning: boolean;
  toggleTimer: () => void;
  handleReset: () => void;
};

export const TimerContext = createContext<TimerContextType | null>(null);

const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const { pomodoroMode, pomodoroInterval, pomodoroBreakInterval, showInMenu } =
    useSettingsContext();
  const [time, setTime] = useState(pomodoroInterval);
  const [timerRunning, setTimerRunning] = useState(false);
  const [pomodoroCooldown, setPomodoroCooldown] = useState(false);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const handleReset = useCallback(() => {
    setTime(pomodoroInterval);
    setTimerRunning(false);
    setPomodoroCooldown(false);
  }, [pomodoroInterval]);

  const handlePomodoroComplete = useCallback(() => {
    if (pomodoroCooldown) {
      handleReset();
    } else {
      notifications.sendNotification('Cooldown');
      setPomodoroCooldown(true);
      setTime(pomodoroBreakInterval); // 5 minute cooldown
      setTimerRunning(true);
    }
  }, [handleReset, pomodoroCooldown, pomodoroBreakInterval]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          clearInterval(interval);
          setTimerRunning(false);
          if (pomodoroMode) {
            handlePomodoroComplete();
          } else {
            handleReset();
            notifications.sendNotification('Timer Complete');
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [handlePomodoroComplete, handleReset, pomodoroMode, time, timerRunning]);

  useEffect(() => {
    if (showInMenu) {
      window.electron.setTime(time);
    }
  }, [time, showInMenu]);

  useEffect(() => {
    if (!timerRunning) {
      handleReset();
    }
  }, [handleReset, pomodoroInterval, timerRunning]);

  return (
    <TimerContext.Provider
      value={{
        time,
        timerRunning,
        toggleTimer,
        handleReset,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;

export const useTimerContext = () => {
  const contextValues = useContext(TimerContext) as TimerContextType;

  return {
    ...contextValues,
  };
};
