import { Flex } from '@chakra-ui/react';
import SettingsModal from 'renderer/containers/SettingsModal';

const Header = () => {
  return (
    <Flex justifyContent="flex-end" p={4} width="100%">
      {/* <ReportsModal /> */}
      <SettingsModal />
    </Flex>
  );
};

export default Header;
