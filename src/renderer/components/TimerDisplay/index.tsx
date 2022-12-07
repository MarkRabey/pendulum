import {
  CircularProgress,
  CircularProgressLabel,
  CircularProgressProps,
  ThemeTypings,
  useColorMode,
} from '@chakra-ui/react';
import formatTimer from 'shared/utils/formatTimer';

interface TimerDisplayProps extends CircularProgressProps {
  time: number;
  colorScheme: ThemeTypings['colorSchemes'];
}

const TimerDisplay = ({ time, colorScheme, ...rest }: TimerDisplayProps) => {
  const { colorMode } = useColorMode();

  return (
    <CircularProgress
      my={4}
      thickness={4}
      color={`${colorScheme}.${colorMode === 'dark' ? '700 ' : '300'}`}
      trackColor={`${colorScheme}.200`}
      {...rest}
    >
      <CircularProgressLabel as="kbd" color="white">
        {formatTimer(time)}
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default TimerDisplay;
