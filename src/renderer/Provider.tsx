import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import TimerProvider from 'renderer/context/TimerContext';
import SettingsProvider from './context/SettingsContext';
import theme from './theme';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      <SettingsProvider>
        <TimerProvider>{children}</TimerProvider>
      </SettingsProvider>
    </ChakraProvider>
  );
};

export default Provider;
