import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import notifications from 'renderer/ultils/notifications';
import { useSettignsContext } from '../SettingsContext';

export type TimerContextType = {
  selectedTime: number;
  time: number;
  timerRunning: boolean;
  toggleTimer: () => void;
  handleSetTime: (value: number) => void;
  handleReset: () => void;
};

export const TimerContext = createContext<TimerContextType | null>(null);

const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const { pomodoroMode, pomodoroCooldown, handleSetPomodoroCooldown } =
    useSettignsContext();
  const [selectedTime, setSelectedTime] = useState(10);
  const [time, setTime] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const handleSetTime = (value: number) => {
    setTimerRunning(false);
    setSelectedTime(value);
    setTime(value);
  };

  const handleReset = useCallback(() => {
    setTime(selectedTime);
    setTimerRunning(false);
    handleSetPomodoroCooldown(false);
  }, [handleSetPomodoroCooldown, selectedTime]);

  const handlePomodoroComplete = useCallback(() => {
    if (pomodoroCooldown) {
      handleReset();
    } else {
      notifications.sendNotification('5 minute cooldown');
      handleSetPomodoroCooldown(true);
      setTime(300); // 5 minute cooldown
      setTimerRunning(true);
    }
  }, [handleReset, handleSetPomodoroCooldown, pomodoroCooldown]);

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

  return (
    <TimerContext.Provider
      value={{
        selectedTime,
        time,
        timerRunning,
        toggleTimer,
        handleSetTime,
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
