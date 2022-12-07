import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  ThemeTypings,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useRef } from 'react';

interface ConfirmDialogProps {
  title?: string;
  message?: string;
  triggerLabel?: string;
  triggerButtonProps?: ButtonProps;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColorScheme?: ThemeTypings['colorSchemes'];
}

const ConfirmDialog = ({
  title,
  message,
  triggerLabel,
  triggerButtonProps,
  onConfirm,
  confirmLabel,
  cancelLabel,
  confirmColorScheme,
}: ConfirmDialogProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }

    onClose();
  }, [onConfirm, onClose]);

  return (
    <>
      <Button onClick={onOpen} {...triggerButtonProps}>
        {triggerLabel}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelLabel}
            </Button>

            <Button
              colorScheme={confirmColorScheme}
              onClick={handleConfirm}
              ml={3}
            >
              {confirmLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

ConfirmDialog.defaultProps = {
  title: 'Are you sure?',
  message: 'Do you really want to perform this action?',
  triggerButtonProps: {
    background: 'blue.300',
  },
  triggerLabel: 'Open',
  onConfirm: () => null,
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  confirmColorScheme: 'red',
};

export default ConfirmDialog;
