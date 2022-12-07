import { Flex } from '@chakra-ui/react';
import TimerControls from 'renderer/components/TimerControls';
import TimerDisplay from 'renderer/components/TimerDisplay';
import TimerStateControl from 'renderer/components/TimerStateControl';
import Layout from 'renderer/containers/Layout';
import { useTimerContext } from 'renderer/context/TimerContext';

const Home = () => {
  const {
    time,
    timerRunning,
    timerState,
    handleSetTimerState,
    toggleTimer,
    handleReset,
  } = useTimerContext();
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
        <TimerDisplay time={time} fontSize="7xl" />
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
