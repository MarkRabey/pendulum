import { Flex } from '@chakra-ui/react';
import TimerControls from 'renderer/components/TimerControls';
import TimerDisplay from 'renderer/components/TimerDisplay';
import Layout from 'renderer/containers/Layout';
import { useTimerContext } from 'renderer/context/TimerContext';

const Home = () => {
  const { time, timerRunning, toggleTimer, handleReset } = useTimerContext();
  return (
    <Layout>
      <Flex direction="column" alignItems="center">
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
