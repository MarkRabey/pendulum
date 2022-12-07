import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ThemeTypings,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdSettings } from 'react-icons/md';
import SettingsControls from 'renderer/components/SettingsControls';

interface SettingsModalProps {
  colorScheme: ThemeTypings['colorSchemes'];
}

const SettingsModal = ({ colorScheme }: SettingsModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    window.electron.ipcRenderer.on('open-preferences', () => {
      onOpen();
    });

    window.electron.ipcRenderer.on('close-preferences', () => {
      onClose();
    });
  }, [onOpen, onClose]);

  return (
    <>
      <Tooltip label="Settings" hasArrow>
        <Button onClick={onOpen} colorScheme={colorScheme} variant="ghost">
          <Icon fontSize={24} as={MdSettings} />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SettingsControls />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>OK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsModal;
