import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useSettignsContext } from 'renderer/context/SettingsContext';

const SettingsControls = () => {
  const { pomodoroMode, handleSetPomodoroMode } = useSettignsContext();

  return (
    <>
      <FormControl display="flex">
        <FormLabel color="white">Enable Pomodoro Mode?</FormLabel>
        <Switch
          size="lg"
          defaultChecked={pomodoroMode}
          onChange={() => handleSetPomodoroMode(!pomodoroMode)}
        />
      </FormControl>
    </>
  );
};

export default SettingsControls;
