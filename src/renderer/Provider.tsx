import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import TimerProvider from 'renderer/context/TimerContext';
import SettingsProvider from './context/SettingsContext';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      <SettingsProvider>
        <TimerProvider>{children}</TimerProvider>
      </SettingsProvider>
    </ChakraProvider>
  );
};

export default Provider;
