import { Button, Flex } from '@chakra-ui/react';

interface TimerControlsProps {
  timerRunning: boolean;
  toggleTimer: () => void;
}

const TimerControls = ({ timerRunning, toggleTimer }: TimerControlsProps) => (
  <Flex>
    <Button width="7rem" background="tomato" onClick={toggleTimer}>
      {!timerRunning ? 'Start' : 'Pause'}
    </Button>
  </Flex>
);

export default TimerControls;
