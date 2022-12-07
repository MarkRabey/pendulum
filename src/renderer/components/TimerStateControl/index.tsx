import { Button, Stack, ThemeTypings } from '@chakra-ui/react';
import { TimerState } from 'renderer/constants';
import getEnumKeys from 'shared/utils/getEnumKeys';
import ConfirmDialog from '../ConfirmDialog';

interface TimerStateControlProps {
  timerRunning: boolean;
  timerState: TimerState;
  onChange: (state: TimerState) => void;
  colorScheme: ThemeTypings['colorSchemes'];
}

const TimerStateControl = ({
  timerRunning,
  timerState,
  onChange,
  colorScheme,
}: TimerStateControlProps) => (
  <Stack direction="row">
    {getEnumKeys(TimerState).map((key) => {
      const isCurrent = timerState === TimerState[key];
      if (isCurrent || !timerRunning) {
        return (
          <Button
            key={key}
            variant={timerState === TimerState[key] ? 'solid' : 'ghost'}
            onClick={() => (!isCurrent ? onChange(TimerState[key]) : null)}
            colorScheme={colorScheme}
            size="sm"
          >
            {TimerState[key]}
          </Button>
        );
      }
      return (
        <ConfirmDialog
          key={key}
          triggerLabel={TimerState[key]}
          triggerButtonProps={{
            colorScheme,
            variant: 'ghost',
            size: 'sm',
          }}
          message="This will stop the current timer. Do you really want to do this?"
          confirmColorScheme={colorScheme}
          confirmLabel="Continue"
          onConfirm={() => {
            onChange(TimerState[key]);
          }}
        />
      );
    })}
  </Stack>
);

export default TimerStateControl;
