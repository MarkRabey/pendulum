import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TimerState } from 'renderer/constants';
import useTimeForState from 'renderer/hooks/useTimeForState';
import notifications from 'renderer/utils/notifications';
import { useSettingsContext } from '../SettingsContext';

export type TimerContextType = {
  time: number;
  timerRunning: boolean;
  timerState: TimerState;
  pomodoroCount: number;
  handleSetTimerState: (state: TimerState) => void;
  toggleTimer: () => void;
  handleReset: () => void;
};

export const TimerContext = createContext<TimerContextType | null>(null);

const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    autoStartPomodoros,
    autoStartBreaks,
    longBreakInterval,
    longBreakTime,
    pomodoroTime,
    shortBreakTime,
    showInMenu,
  } = useSettingsContext();
  const [time, setTime] = useState(pomodoroTime);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerState, setTimerState] = useState(TimerState.POMODORO);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const stateTime = useTimeForState(timerState);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const startTimer = useCallback(
    (state: TimerState, newTime: number, notification?: string) => {
      if (notification) {
        notifications.sendNotification(notification);
      }
      setTimerState(state);
      setTime(newTime);
      setTimerRunning(true);
    },
    []
  );

  const handleReset = useCallback(() => {
    setTime(stateTime);
    setTimerRunning(false);
    setPomodoroCount(0);
  }, [stateTime]);

  const handleSetTimerState = (state: TimerState) => {
    setTimerState(state);
    handleReset();
  };
  const handleTimerComplete = useCallback(() => {
    setTimerRunning(false);

    if (timerState === TimerState.POMODORO) {
      setPomodoroCount(pomodoroCount + 1);

      if (autoStartBreaks) {
        if (pomodoroCount + 1 < longBreakInterval) {
          startTimer(
            TimerState.SHORT_BREAK,
            shortBreakTime,
            'Time for a short break'
          );
        } else {
          startTimer(
            TimerState.LONG_BREAK,
            longBreakTime,
            'Time for a longer break'
          );
        }
      } else if (autoStartPomodoros) {
        startTimer(TimerState.POMODORO, pomodoroTime);
      } else {
        notifications.sendNotification('Timer finished');
        handleReset();
      }
    } else if (timerState === TimerState.SHORT_BREAK) {
      if (autoStartBreaks) {
        startTimer(TimerState.POMODORO, pomodoroTime, 'Time to refocus');
      } else {
        handleReset();
      }
    } else if (timerState === TimerState.LONG_BREAK) {
      if (autoStartPomodoros) {
        setPomodoroCount(0);
        notifications.sendNotification('Time to refocus');
        startTimer(TimerState.POMODORO, pomodoroTime);
      } else {
        handleReset();
      }
    }
  }, [
    timerState,
    autoStartBreaks,
    autoStartPomodoros,
    pomodoroCount,
    longBreakInterval,
    startTimer,
    shortBreakTime,
    longBreakTime,
    pomodoroTime,
    handleReset,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          clearInterval(interval);
          handleTimerComplete();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    handleReset,
    autoStartPomodoros,
    time,
    timerRunning,
    handleTimerComplete,
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
        timerState,
        pomodoroCount,
        handleSetTimerState,
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
