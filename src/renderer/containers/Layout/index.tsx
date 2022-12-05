import { Flex } from '@chakra-ui/react';
import Header from 'renderer/components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex
      background="gray.700"
      height="100%"
      alignItems="center"
      flexDirection="column"
    >
      <Header />
      {children}
    </Flex>
  );
};

export default Layout;
