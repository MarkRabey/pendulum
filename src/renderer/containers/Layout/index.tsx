import { Flex, Heading } from '@chakra-ui/react';

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
      <Heading color="white">Pendulum</Heading>
      {children}
    </Flex>
  );
};

export default Layout;
