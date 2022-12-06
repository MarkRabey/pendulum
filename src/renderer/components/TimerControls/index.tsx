import { Button, Flex } from '@chakra-ui/react';
import ConfirmDialog from '../ConfirmDialog';

interface TimerControlsProps {
  timerRunning: boolean;
  toggleTimer: () => void;
  handleReset: () => void;
}

const TimerControls = ({
  timerRunning,
  toggleTimer,
  handleReset,
}: TimerControlsProps) => (
  <Flex>
    <Button width="7rem" background="tomato" onClick={toggleTimer}>
      {!timerRunning ? 'Start' : 'Pause'}
    </Button>
    <ConfirmDialog
      triggerLabel="Reset"
      triggerButtonProps={{
        background: 'blue.300',
        marginX: 5,
        disabled: !timerRunning,
      }}
      confirmColorScheme="blue"
      confirmLabel="Reset"
      onConfirm={handleReset}
    />
  </Flex>
);

export default TimerControls;
