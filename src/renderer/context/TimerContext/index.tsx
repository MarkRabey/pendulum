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
  const { autoStartPomodoros, pomodoroTime, shortBreakTime, showInMenu } =
    useSettingsContext();
  const [time, setTime] = useState(pomodoroTime);
  const [timerRunning, setTimerRunning] = useState(false);
  const [pomodoroCooldown, setPomodoroCooldown] = useState(false);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const handleReset = useCallback(() => {
    setTime(pomodoroTime);
    setTimerRunning(false);
    setPomodoroCooldown(false);
  }, [pomodoroTime]);

  const handlePomodoroComplete = useCallback(() => {
    if (pomodoroCooldown) {
      handleReset();
    } else {
      notifications.sendNotification('Cooldown');
      setPomodoroCooldown(true);
      setTime(shortBreakTime); // 5 minute cooldown
      setTimerRunning(true);
    }
  }, [handleReset, pomodoroCooldown, shortBreakTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          clearInterval(interval);
          setTimerRunning(false);
          if (autoStartPomodoros) {
            handlePomodoroComplete();
          } else {
            handleReset();
            notifications.sendNotification('Timer Complete');
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    handlePomodoroComplete,
    handleReset,
    autoStartPomodoros,
    time,
    timerRunning,
  ]);

  useEffect(() => {
    if (showInMenu) {
      window.electron.setTime(time);
    }
  }, [time, showInMenu]);

  useEffect(() => {
    if (!timerRunning) {
      handleReset();
    }
  }, [handleReset, pomodoroTime, timerRunning]);

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
