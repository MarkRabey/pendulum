import Timer from 'renderer/components/Timer';
import TimerDisplay from 'renderer/components/TimerDisplay';
import Layout from 'renderer/containers/Layout';
import { useTimerContext } from 'renderer/context/TimerContext';

const Home = () => {
  const { time } = useTimerContext();
  return (
    <Layout>
      <TimerDisplay time={time} fontSize="7xl" color="white" />
      <Timer />
    </Layout>
  );
};

export default Home;
