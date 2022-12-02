import IntervalSelector from 'renderer/components/IntervalSelector';
import TimerControls from 'renderer/components/TimerControls';
import TimerDisplay from 'renderer/components/TimerDisplay';
import Layout from 'renderer/containers/Layout';
import { useTimerContext } from 'renderer/context/TimerContext';

const Home = () => {
  const {
    time,
    timerRunning,
    toggleTimer,
    handleReset,
    selectedTime,
    handleSetTime,
  } = useTimerContext();
  return (
    <Layout>
      <TimerDisplay time={time} fontSize="7xl" color="white" />
      <TimerControls
        timerRunning={timerRunning}
        toggleTimer={toggleTimer}
        handleReset={handleReset}
      />
      <IntervalSelector
        selectedTime={selectedTime}
        handleSetTime={handleSetTime}
      />
    </Layout>
  );
};

export default Home;
