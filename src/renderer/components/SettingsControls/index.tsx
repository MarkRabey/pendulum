import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useTimerContext } from 'renderer/context/TimerContext';

const SettingsControls = () => {
  const { pomodoroMode, handleTogglePomodoroMode } = useTimerContext();

  return (
    <>
      <FormControl display="flex">
        <FormLabel color="white">Enable Pomodoro Mode?</FormLabel>
        <Switch
          size="lg"
          defaultChecked={pomodoroMode}
          onChange={handleTogglePomodoroMode}
        />
      </FormControl>
    </>
  );
};

export default SettingsControls;
