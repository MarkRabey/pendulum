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
  const [timerProgress, setTimerProgress] = useState(0);
  const [colorScheme, setColorScheme] = useState('purple');
  const { time, timerRunning, timerState, handleSetTimerState, toggleTimer } =
    useTimerContext();

  const { pomodoroTime, shortBreakTime, longBreakTime } = useSettingsContext();

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

  return (
    <Layout colorScheme={colorScheme}>
      <Flex
        direction="column"
        alignItems="center"
        backgroundColor={
          colorMode === 'dark' ? 'blackAlpha.300' : 'blackAlpha.100'
        }
        borderRadius={8}
        py={6}
      >
        <TimerStateControl
          colorScheme={colorScheme}
          timerState={timerState}
          timerRunning={timerRunning}
          onChange={handleSetTimerState}
        />
        <TimerDisplay
          value={timerProgress}
          time={time}
          colorScheme={colorScheme}
          size={160}
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
