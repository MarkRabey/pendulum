import {
  CircularProgress,
  CircularProgressLabel,
  CircularProgressProps,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import formatTimer from 'shared/utils/formatTimer';

interface TimerDisplayProps extends CircularProgressProps {
  time: number;
  startTime: number;
}

const TimerDisplay = ({
  time,
  startTime,
  color = 'red.400',
  size = 120,
}: TimerDisplayProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const percentage = time / startTime;
    setProgress(Math.round(percentage * 100));
  }, [startTime, time]);
  return (
    <CircularProgress
      value={progress}
      size={size}
      my={2}
      color={color}
      border="transparent"
    >
      <CircularProgressLabel>{formatTimer(time)}</CircularProgressLabel>
    </CircularProgress>
  );
};

export default TimerDisplay;
