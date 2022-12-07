import { Button, Stack } from '@chakra-ui/react';
import { TimerState } from 'renderer/context/TimerContext';

interface TimerStateControlProps {
  timerState: TimerState;
  onChange: (state: TimerState) => void;
}

const TimerStateControl = ({
  timerState,
  onChange,
}: TimerStateControlProps) => (
  <Stack direction="row">
    <Button
      variant={timerState === TimerState.POMODORO ? 'solid' : 'ghost'}
      onClick={() => onChange(TimerState.POMODORO)}
    >
      {TimerState.POMODORO}
    </Button>
    <Button
      variant={timerState === TimerState.SHORT_BREAK ? 'solid' : 'ghost'}
      onClick={() => onChange(TimerState.SHORT_BREAK)}
    >
      {TimerState.SHORT_BREAK}
    </Button>
    <Button
      variant={timerState === TimerState.LONG_BREAK ? 'solid' : 'ghost'}
      onClick={() => onChange(TimerState.LONG_BREAK)}
    >
      {TimerState.LONG_BREAK}
    </Button>
  </Stack>
);

export default TimerStateControl;
