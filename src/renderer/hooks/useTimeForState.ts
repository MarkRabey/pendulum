import { useEffect, useState } from 'react';
import { TimerState } from 'renderer/constants';
import { useSettingsContext } from 'renderer/context/SettingsContext';

const useTimeForState = (timerState: TimerState) => {
  const [stateTime, setStateTime] = useState(0);
  const { pomodoroTime, shortBreakTime, longBreakTime } = useSettingsContext();

  useEffect(() => {
    if (timerState === TimerState.POMODORO) {
      setStateTime(pomodoroTime);
    }

    if (timerState === TimerState.SHORT_BREAK) {
      setStateTime(shortBreakTime);
    }

    if (timerState === TimerState.LONG_BREAK) {
      setStateTime(longBreakTime);
    }
  }, [longBreakTime, pomodoroTime, shortBreakTime, timerState]);

  return stateTime;
};

export default useTimeForState;
