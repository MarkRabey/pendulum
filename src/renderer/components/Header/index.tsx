import { Flex, ThemeTypings } from '@chakra-ui/react';
import SettingsModal from 'renderer/containers/SettingsModal';

interface HeaderProps {
  colorScheme: ThemeTypings['colorSchemes'];
}

const Header = ({ colorScheme }: HeaderProps) => {
  return (
    <Flex justifyContent="flex-end" p={4} width="100%">
      {/* <ReportsModal /> */}
      <SettingsModal colorScheme={colorScheme} />
    </Flex>
  );
};

export default Header;
