import { Flex, Icon, Link } from '@chakra-ui/react';
import { MdHome, MdSettings } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <Flex justifyContent="space-between" p={2} width="100%">
      <Link as={RouterLink} to="/">
        <Icon color="gray.400" fontSize={24} as={MdHome} />
      </Link>
      <Link as={RouterLink} to="/settings">
        <Icon color="gray.400" fontSize={24} as={MdSettings} />
      </Link>
    </Flex>
  );
};

export default Header;
