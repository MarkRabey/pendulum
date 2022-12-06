import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Header from 'renderer/components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const backgroundColor = useColorModeValue('white', 'gray.700');
  return (
    <Flex
      border="none"
      background={backgroundColor}
      height="100%"
      alignItems="center"
      flexDirection="column"
    >
      <Header />
      <Box width="100%" px={6}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
