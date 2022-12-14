import {
  Button,
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
import { createRef } from 'react';
import { useSettingsContext } from 'renderer/context/SettingsContext';

const SettingsControls = () => {
  const { colorMode, setColorMode } = useColorMode();
  const pomodoroTimeRef = createRef<HTMLDivElement>();
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

  const handleResetTimes = () => {
    handleSetPomodoroTime(1500);
    handleSetShortBreakTime(300);
    handleSetLongBreakTime(900);
  };

  return (
    <Flex direction="column" width="100%">
      <FormLabel fontWeight="extrabold">Time (minutes)</FormLabel>
      <Stack direction="row">
        <FormControl>
          <FormLabel color="gray.400">Pomodoro</FormLabel>
          <NumberInput
            ref={pomodoroTimeRef}
            step={1}
            value={pomodoroTime / 60}
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
            value={shortBreakTime / 60}
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
            value={longBreakTime / 60}
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
      <Flex mt={4}>
        <Button size="sm" onClick={handleResetTimes} variant="link">
          Reset times
        </Button>
      </Flex>
      <Divider my={4} />

      <FormControl display="flex" justifyContent="space-between">
        <FormLabel>Auto start breaks?</FormLabel>
        <Switch
          size="lg"
          defaultChecked={autoStartBreaks}
          onChange={() => handleSetAutoStartBreaks(!autoStartBreaks)}
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
