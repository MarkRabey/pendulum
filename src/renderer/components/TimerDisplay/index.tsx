import { Text, TextProps } from '@chakra-ui/react';

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
    {`${
      Math.floor(time / 60) < 10
        ? `0${Math.floor(time / 60)}`
        : `${Math.floor(time / 60)}`
    }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
  </Text>
);

export default TimerDisplay;
