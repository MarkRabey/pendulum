import {
  Flex,
  FormControl,
  FormLabel,
  Select,
  Switch,
  useColorMode,
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
  const { colorMode, setColorMode } = useColorMode();
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
    <Flex direction="column" width="100%">
      <FormControl justifyContent="space-between" my={4}>
        <FormLabel flex={1}>Show in menu?</FormLabel>
        <Switch
          size="lg"
          defaultChecked={showInMenu}
          onChange={() => handleSetShowInMenu(!showInMenu)}
        />
      </FormControl>

      <FormControl justifyContent="space-between" my={4}>
        <FormLabel flex={1}>Timer Interval</FormLabel>
        <Select
          flex={1}
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

      <FormControl my={4}>
        <FormLabel flex={1}>Break Interval</FormLabel>
        <Select
          flex={1}
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

      <FormControl my={4}>
        <FormLabel flex={1}>Display Mode</FormLabel>
        <Select
          variant="filled"
          onChange={(e) => setColorMode(e.target.value)}
          value={colorMode}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </Select>
      </FormControl>

      <FormControl my={4}>
        <FormLabel>Enable Pomodoro Mode?</FormLabel>
        <Switch
          size="lg"
          defaultChecked={pomodoroMode}
          onChange={() => handleSetPomodoroMode(!pomodoroMode)}
        />
      </FormControl>
    </Flex>
  );
};

export default SettingsControls;
