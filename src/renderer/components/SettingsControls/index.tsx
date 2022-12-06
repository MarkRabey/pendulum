import {
  FormControl,
  FormLabel,
  Select,
  Stack,
  Switch,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useSettingsContext } from 'renderer/context/SettingsContext';

const intervalOptions = [
  {
    value: 10,
    label: '10 seconds',
  },
  {
    value: 300,
    label: '5 minutes',
  },
  {
    value: 600,
    label: '10 minutes',
  },
  {
    value: 900,
    label: '15 minutes',
  },
  {
    value: 1500,
    label: '25 minutes',
  },
];

const SettingsControls = () => {
  const {
    pomodoroMode,
    handleSetPomodoroMode,
    showInMenu,
    handleSetShowInMenu,
    pomodoroInterval,
    handleSetPomodoroInterval,
    pomodoroBreakInterval,
    handleSetPomodoroBreakInterval,
  } = useSettingsContext();

  const handleChangeInterval = (e: ChangeEvent<HTMLSelectElement>) => {
    handleSetPomodoroInterval(parseInt(e.target.value, 10));
  };

  const handleChangeBreakInterval = (e: ChangeEvent<HTMLSelectElement>) => {
    handleSetPomodoroBreakInterval(parseInt(e.target.value, 10));
  };

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

      <FormControl display="flex">
        <FormLabel color="white">Timer Interval</FormLabel>
        <Select
          variant="filled"
          onChange={handleChangeInterval}
          value={pomodoroInterval}
        >
          {intervalOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl display="flex">
        <FormLabel color="white">Break Interval</FormLabel>
        <Select
          variant="filled"
          onChange={handleChangeBreakInterval}
          value={pomodoroBreakInterval}
        >
          {intervalOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SettingsControls;
