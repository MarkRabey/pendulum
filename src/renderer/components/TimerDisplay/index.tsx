import { Text, TextProps } from '@chakra-ui/react';
import formatTimer from 'shared/utils/formatTimer';

interface TimerDisplayProps extends TextProps {
  time: number;
}

const TimerDisplay = ({
  time,
  fontSize,
  color,
  fontWeight = 'bold',
}: TimerDisplayProps) => (
  <Text fontWeight={fontWeight} fontSize={fontSize} color={color} as="kbd">
    {formatTimer(time)}
  </Text>
);

export default TimerDisplay;
