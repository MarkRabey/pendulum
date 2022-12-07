import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Header from 'renderer/components/Header';
import { TimerState } from 'renderer/context/TimerContext';

interface LayoutProps {
  children: React.ReactNode;
  timerState: TimerState;
}
const getColorForTimerState = (state: TimerState) => {
  if (state === TimerState.POMODORO) {
    return 'red.500';
  }
  if (state === TimerState.SHORT_BREAK) {
    return 'blue.500';
  }
  if (state === TimerState.LONG_BREAK) {
    return 'teal.500';
  }
  return 'gray.500';
};

const Layout = ({ children, timerState }: LayoutProps) => {
  const defaultBackgroundColor = useColorModeValue('white', 'gray.700');
  const [backgroundColor, setBackgroundColor] = useState(
    defaultBackgroundColor
  );

  useEffect(() => {
    setBackgroundColor(getColorForTimerState(timerState));
  }, [timerState]);

  return (
    <Flex
      border="none"
      background={backgroundColor}
      height="100%"
      alignItems="center"
      flexDirection="column"
      transition="background-color .4s"
    >
      <Header />
      <Box width="100%" px={6}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
