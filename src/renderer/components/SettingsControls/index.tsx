import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Switch,
  useColorMode,
} from '@chakra-ui/react';
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
    autoStartPomodoros,
    handleSetAutoStartPomodoros,
    autoStartBreaks,
    handleSetAutoStartBreaks,
    showInMenu,
    handleSetShowInMenu,
    pomodoroTime,
    handleSetPomodoroTime,
    shortBreakTime,
    handleSetShortBreakTime,
    longBreakTime,
    handleSetLongBreakTime,
    longBreakInterval,
    handleSetLongBreakInterval,
  } = useSettingsContext();

  return (
    <Flex direction="column" width="100%">
      <FormLabel fontWeight="extrabold">Time (minutes)</FormLabel>
      <Stack direction="row">
        <FormControl>
          <FormLabel color="gray.400">Pomodoro</FormLabel>
          <NumberInput
            step={1}
            defaultValue={pomodoroTime / 60}
            onChange={(value) =>
              handleSetPomodoroTime(parseInt(value, 10) * 60)
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel color="gray.400">Short Break</FormLabel>
          <NumberInput
            step={1}
            defaultValue={shortBreakTime / 60}
            onChange={(value) =>
              handleSetShortBreakTime(parseInt(value, 10) * 60)
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel color="gray.400">Long Break</FormLabel>
          <NumberInput
            step={1}
            defaultValue={longBreakTime / 60}
            onChange={(value) =>
              handleSetLongBreakTime(parseInt(value, 10) * 60)
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Stack>
      <Divider my={4} />

      <FormControl display="flex" justifyContent="space-between">
        <FormLabel>Auto start breaks?</FormLabel>
        <Switch
          size="lg"
          defaultChecked={autoStartBreaks}
          onChange={() => handleSetAutoStartBreaks(!showInMenu)}
        />
      </FormControl>
      <Divider my={4} />

      <FormControl display="flex" justifyContent="space-between">
        <FormLabel>Auto start Pomodoros?</FormLabel>
        <Switch
          size="lg"
          defaultChecked={autoStartPomodoros}
          onChange={() => handleSetAutoStartPomodoros(!autoStartPomodoros)}
        />
      </FormControl>
      <Divider my={4} />

      <FormControl display="flex" justifyContent="space-between">
        <FormLabel flex={1}>Long Break interval?</FormLabel>
        <NumberInput
          width="125px"
          step={1}
          defaultValue={longBreakInterval}
          onChange={(value) => handleSetLongBreakInterval(parseInt(value, 10))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <Divider my={4} />

      <FormControl display="flex" justifyContent="space-between">
        <FormLabel>Show in menu?</FormLabel>
        <Switch
          size="lg"
          defaultChecked={showInMenu}
          onChange={() => handleSetShowInMenu(!showInMenu)}
        />
      </FormControl>
      <Divider my={4} />

      <FormControl display="flex" justifyContent="space-between">
        <FormLabel>Display Mode</FormLabel>
        <Select
          width="125px"
          variant="filled"
          onChange={(e) => setColorMode(e.target.value)}
          value={colorMode}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </Select>
      </FormControl>
    </Flex>
  );
};

export default SettingsControls;
