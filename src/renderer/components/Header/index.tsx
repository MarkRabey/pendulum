import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import { MdHome, MdSettings } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <Flex className="header" justifyContent="space-between" p={5} width="100%">
      <Link as={RouterLink} to="/">
        <Icon color="gray.400" fontSize={24} as={MdHome} />
      </Link>
      <Text color="gray.400" fontWeight="bold" fontSize={24}>
        Pendulum
      </Text>
      <Link as={RouterLink} to="/settings">
        <Icon color="gray.400" fontSize={24} as={MdSettings} />
      </Link>
    </Flex>
  );
};

export default Header;
