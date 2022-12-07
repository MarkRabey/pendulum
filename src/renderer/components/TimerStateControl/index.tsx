import { Button, Stack } from '@chakra-ui/react';
import { TimerState } from 'renderer/context/TimerContext';
import getEnumKeys from 'shared/utils/getEnumKeys';

interface TimerStateControlProps {
  timerState: TimerState;
  onChange: (state: TimerState) => void;
}

const TimerStateControl = ({
  timerState,
  onChange,
}: TimerStateControlProps) => (
  <Stack direction="row">
    {getEnumKeys(TimerState).map((key) => (
      <Button
        key={key}
        variant={timerState === TimerState[key] ? 'solid' : 'ghost'}
        onClick={() => onChange(TimerState[key])}
      >
        {TimerState[key]}
      </Button>
    ))}
  </Stack>
);

export default TimerStateControl;
