import { Flex } from '@chakra-ui/react';
import SettingsControls from 'renderer/components/SettingsControls';
import Layout from 'renderer/containers/Layout';

const Settings = () => {
  return (
    <Layout>
      <Flex alignItems="flex-start" width="100%">
        <SettingsControls />
      </Flex>
    </Layout>
  );
};

export default Settings;
