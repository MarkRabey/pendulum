import { Button, Flex, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TimerDisplay from 'renderer/components/TimerDisplay';
import TimerStateControl from 'renderer/components/TimerStateControl';
import { TimerState } from 'renderer/constants';
import Layout from 'renderer/containers/Layout';
import { useSettingsContext } from 'renderer/context/SettingsContext';
import { useTimerContext } from 'renderer/context/TimerContext';

const Home = () => {
  const { colorMode } = useColorMode();
  const [startTime, setStartTime] = useState(0);
  const [pomodoroProgress, setPomodoroProgress] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const [colorScheme, setColorScheme] = useState('purple');
  const {
    time,
    timerRunning,
    timerState,
    pomodoroCount,
    handleSetTimerState,
    toggleTimer,
  } = useTimerContext();

  const { pomodoroTime, shortBreakTime, longBreakTime, longBreakInterval } =
    useSettingsContext();

  useEffect(() => {
    if (timerState === TimerState.POMODORO) {
      setColorScheme('purple');
      setStartTime(pomodoroTime);
    } else if (timerState === TimerState.SHORT_BREAK) {
      setColorScheme('teal');
      setStartTime(shortBreakTime);
    } else if (timerState === TimerState.LONG_BREAK) {
      setColorScheme('blue');
      setStartTime(longBreakTime);
    }
  }, [longBreakTime, pomodoroTime, shortBreakTime, timerState]);

  useEffect(() => {
    setTimerProgress(Math.round((time / startTime) * 100));
  }, [startTime, time]);

  useEffect(() => {
    setPomodoroProgress(Math.round((pomodoroCount / longBreakInterval) * 100));
  }, [longBreakInterval, pomodoroCount]);
  return (
    <Layout colorScheme={colorScheme}>
      <Flex
        direction="column"
        alignItems="center"
        backgroundColor={
          colorMode === 'dark' ? 'blackAlpha.300' : 'blackAlpha.100'
        }
        borderRadius={8}
        p={6}
        flex={1}
      >
        <TimerStateControl
          colorScheme={colorScheme}
          timerState={timerState}
          timerRunning={timerRunning}
          onChange={handleSetTimerState}
        />
        <TimerDisplay
          timerProgress={timerProgress}
          pomodoroProgress={pomodoroProgress}
          time={time}
          colorScheme={colorScheme}
        />
        <Button
          variant="solid"
          colorScheme={colorScheme}
          size="lg"
          onClick={toggleTimer}
        >
          {timerRunning ? 'Stop' : 'Start'}
        </Button>
      </Flex>
    </Layout>
  );
};

export default Home;
