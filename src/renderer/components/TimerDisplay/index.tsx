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
  pomodoroProgress: number;
  timerProgress: number;
}

const TimerDisplay = ({
  time,
  colorScheme,
  pomodoroProgress,
  timerProgress,
}: TimerDisplayProps) => {
  const { colorMode } = useColorMode();

  return (
    <CircularProgress
      my={4}
      value={timerProgress}
      size={180}
      color={`${colorScheme}.${colorMode === 'dark' ? '700 ' : '300'}`}
      trackColor={`${colorScheme}.200`}
      thickness={4}
    >
      <CircularProgressLabel>
        <CircularProgress
          value={pomodoroProgress}
          thickness={4}
          color={`${colorScheme}.${colorMode === 'dark' ? '700' : '300'}`}
          trackColor={`${colorScheme}.200`}
          size={160}
        >
          <CircularProgressLabel
            as="kbd"
            color={`${colorScheme}.${colorMode === 'dark' ? '300' : '600'}`}
            fontFamily="Fira Mono"
          >
            {formatTimer(time)}
          </CircularProgressLabel>
        </CircularProgress>
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default TimerDisplay;
