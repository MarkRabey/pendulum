import {
  CircularProgress,
  CircularProgressLabel,
  CircularProgressProps,
} from '@chakra-ui/react';
import formatTimer from 'shared/utils/formatTimer';

interface TimerDisplayProps extends CircularProgressProps {
  time: number;
}

const TimerDisplay = ({ time, ...rest }: TimerDisplayProps) => (
  <CircularProgress my={2} thickness={4} capIsRound {...rest}>
    <CircularProgressLabel as="kbd">{formatTimer(time)}</CircularProgressLabel>
  </CircularProgress>
);

export default TimerDisplay;
