import { Button, Flex, Text } from '@chakra-ui/react';
import { useTimerContext } from 'renderer/context/TimerContext';
import ConfirmDialog from './ConfirmDialog';

const Timer = () => {
  const {
    selectedTime,
    time,
    timerRunning,
    toggleTimer,
    handleSetTime,
    handleReset,
  } = useTimerContext();
  const buttons = [
    {
      value: 900,
      display: '15 minutes',
    },
    {
      value: 1200,
      display: '20 minutes',
    },
    {
      value: 1800,
      display: '30 minutes',
    },
    {
      value: 3600,
      display: '60 minutes',
    },
  ];

  return (
    <>
      <Text fontWeight="bold" fontSize="7xl" color="white">
        {`${
          Math.floor(time / 60) < 10
            ? `0${Math.floor(time / 60)}`
            : `${Math.floor(time / 60)}`
        }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
      </Text>

      <Flex>
        <Button
          width="7rem"
          background="tomato"
          color="white"
          onClick={toggleTimer}
        >
          {!timerRunning ? 'Start' : 'Pause'}
        </Button>
        <ConfirmDialog
          triggerLabel="Reset"
          triggerButtonProps={{
            background: 'blue.300',
            marginX: 5,
            disabled: !timerRunning,
            color: 'white',
          }}
          confirmColorScheme="blue"
          confirmLabel="Reset"
          onConfirm={handleReset}
        />
      </Flex>

      <Flex marginTop={10}>
        {buttons.map(({ value, display }) => (
          <Button
            key={value}
            marginX={4}
            colorScheme="green"
            onClick={() => {
              handleSetTime(value);
            }}
            variant={selectedTime === value ? 'outline' : 'solid'}
          >
            {display}
          </Button>
        ))}
      </Flex>
    </>
  );
};

export default Timer;
