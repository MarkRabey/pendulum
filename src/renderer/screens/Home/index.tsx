import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TimerControls from 'renderer/components/TimerControls';
import TimerDisplay from 'renderer/components/TimerDisplay';
import TimerStateControl from 'renderer/components/TimerStateControl';
import Layout from 'renderer/containers/Layout';
import { useSettingsContext } from 'renderer/context/SettingsContext';
import { TimerState, useTimerContext } from 'renderer/context/TimerContext';

const Home = () => {
  const [startTime, setStartTime] = useState(0);
  const [timerColor, setTimerColor] = useState('red.400');
  const {
    time,
    timerRunning,
    timerState,
    handleSetTimerState,
    toggleTimer,
    handleReset,
  } = useTimerContext();

  const { pomodoroTime, shortBreakTime, longBreakTime } = useSettingsContext();

  useEffect(() => {
    if (timerState === TimerState.POMODORO) {
      setTimerColor('red.400');
      setStartTime(pomodoroTime);
    } else if (timerState === TimerState.SHORT_BREAK) {
      setTimerColor('blue.400');
      setStartTime(shortBreakTime);
    } else if (timerState === TimerState.LONG_BREAK) {
      setTimerColor('teal.400');
      setStartTime(longBreakTime);
    }
  }, [longBreakTime, pomodoroTime, shortBreakTime, timerState]);

  return (
    <Layout timerState={timerState}>
      <Flex
        direction="column"
        alignItems="center"
        backgroundColor="rgba(255,255,255,0.1)"
        padding={10}
        borderRadius={8}
      >
        <TimerStateControl
          timerState={timerState}
          onChange={handleSetTimerState}
        />
        <TimerDisplay time={time} startTime={startTime} color={timerColor} />
        <TimerControls
          timerRunning={timerRunning}
          toggleTimer={toggleTimer}
          handleReset={handleReset}
        />
      </Flex>
    </Layout>
  );
};

export default Home;
