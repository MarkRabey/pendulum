import React, { createContext, useContext, useEffect, useState } from 'react';

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
  const [selectedTime, setSelectedTime] = useState(1200);
  const [time, setTime] = useState(1200);
  const [timerRunning, setTimerRunning] = useState(false);

  const handleSetTime = (value: number) => {
    setTimerRunning(false);
    setSelectedTime(value);
    setTime(value);
  };

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const handleReset = () => {
    setTime(selectedTime);
    setTimerRunning(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          clearInterval(interval);
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
