import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type TimerContextType = {
  selectedTime: number;
  time: number;
  timerRunning: boolean;
  pomodoroMode: boolean;
  toggleTimer: () => void;
  handleSetTime: (value: number) => void;
  handleReset: () => void;
  handleTogglePomodoroMode: () => void;
};

export const TimerContext = createContext<TimerContextType | null>(null);

const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTime, setSelectedTime] = useState(10);
  const [time, setTime] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState(false);
  const [pomodoroCooldown, setPomodoroCooldown] = useState(false);

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
    setPomodoroCooldown(false);
  }, [selectedTime]);

  const handleTogglePomodoroMode = () => {
    setPomodoroMode(!pomodoroMode);
    handleReset();
  };

  const sendNotification = (message = 'Timer finished') => {
    electron.ipcRenderer.sendMessage('notify', { message });
  };

  const handlePomodoroComplete = useCallback(() => {
    if (pomodoroCooldown) {
      handleReset();
    } else {
      sendNotification('5 minute cooldown');
      setPomodoroCooldown(true);
      setTime(300); // 5 minute cooldown
      setTimerRunning(true);
    }
  }, [handleReset, pomodoroCooldown]);

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
            sendNotification();
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
        pomodoroMode,
        toggleTimer,
        handleSetTime,
        handleReset,
        handleTogglePomodoroMode,
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
