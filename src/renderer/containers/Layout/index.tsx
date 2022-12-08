import { Box, Flex, ThemeTypings, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Header from 'renderer/components/Header';

interface LayoutProps {
  children: React.ReactNode;
  colorScheme?: ThemeTypings['colorSchemes'];
}

const Layout = ({ children, colorScheme = 'purple' }: LayoutProps) => {
  const { colorMode } = useColorMode();
  const [backgroundColor, setBackgroundColor] = useState(`${colorScheme}.500`);

  useEffect(() => {
    setBackgroundColor(
      `${colorScheme}.${colorMode === 'dark' ? '700' : '300'}`
    );
  }, [colorMode, colorScheme]);

  return (
    <Flex
      border="none"
      background={backgroundColor}
      height="100%"
      alignItems="center"
      flexDirection="column"
      transition="background-color .4s"
    >
      <Header colorScheme={colorScheme} />
      <Box>{children}</Box>
    </Flex>
  );
};

Layout.defaultProps = {
  colorScheme: 'purple',
};

export default Layout;
