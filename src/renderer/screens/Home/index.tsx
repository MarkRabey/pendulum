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
  const [timerProgress, setTimerProgress] = useState(0);
  const [timerColor, setTimerColor] = useState('red');
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
      setTimerColor('purple');
      setStartTime(pomodoroTime);
    } else if (timerState === TimerState.SHORT_BREAK) {
      setTimerColor('teal');
      setStartTime(shortBreakTime);
    } else if (timerState === TimerState.LONG_BREAK) {
      setTimerColor('cyan');
      setStartTime(longBreakTime);
    }
  }, [longBreakTime, pomodoroTime, shortBreakTime, timerState]);

  useEffect(() => {
    setTimerProgress(Math.round((time / startTime) * 100));
  }, [startTime, time]);

  return (
    <Layout timerState={timerState}>
      <Flex
        direction="column"
        alignItems="center"
        backgroundColor="blackAlpha.100"
        padding={10}
        borderRadius={8}
      >
        <TimerStateControl
          timerState={timerState}
          onChange={handleSetTimerState}
        />
        <TimerDisplay
          value={timerProgress}
          time={time}
          color={`${timerColor}.400`}
          trackColor={`${timerColor}.600`}
          size={160}
        />
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
