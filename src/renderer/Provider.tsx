import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import TimerProvider from 'renderer/context/TimerContext';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      <TimerProvider>{children}</TimerProvider>
    </ChakraProvider>
  );
};

export default Provider;
