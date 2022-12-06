import { FormControl, FormLabel, Stack, Switch } from '@chakra-ui/react';
import { useSettingsContext } from 'renderer/context/SettingsContext';

const SettingsControls = () => {
  const {
    pomodoroMode,
    handleSetPomodoroMode,
    showInMenu,
    handleSetShowInMenu,
  } = useSettingsContext();

  return (
    <Stack>
      <FormControl display="flex">
        <FormLabel color="white">Show in menu?</FormLabel>
        <Switch
          size="lg"
          defaultChecked={showInMenu}
          onChange={() => handleSetShowInMenu(!showInMenu)}
        />
      </FormControl>

      <FormControl display="flex">
        <FormLabel color="white">Enable Pomodoro Mode?</FormLabel>
        <Switch
          size="lg"
          defaultChecked={pomodoroMode}
          onChange={() => handleSetPomodoroMode(!pomodoroMode)}
        />
      </FormControl>
    </Stack>
  );
};

export default SettingsControls;
