import { Button } from '@chakra-ui/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

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

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const handleSetTime = (value: number) => {
    setTimerRunning(false);
    setSelectedTime(value);
    setTime(value);
  };

  const handleReset = () => {
    setTime(selectedTime);
    setTimerRunning(false);
  };

  const handleTogglePomodoroMode = () => {
    setPomodoroMode(!pomodoroMode);
    handleReset();
  };

  const handleTimerComplete = (message = 'Timer finished') => {
    electron.ipcRenderer.sendMessage('notify', { message });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          clearInterval(interval);
          setTimerRunning(false);
          handleTimerComplete();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, timerRunning]);

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
      <Button onClick={() => handleTimerComplete('Testing')}>Notify</Button>
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
