import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

const Timer = () => {
  const [selectedTime, setSelectedTime] = useState(1200);
  const [time, setTime] = useState(1200);
  const [timerStarted, setTimerStarted] = useState(false);
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

  const toggleTimer = () => {
    setTimerStarted(!timerStarted);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStarted) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStarted, time]);

  const handleReset = () => {
    setTime(selectedTime);
    setTimerStarted(false);
  };

  return (
    <div style={{ height: '100%' }}>
      <Flex
        background="gray.700"
        height="100%"
        alignItems="center"
        flexDirection="column"
      >
        <Heading color="white">Pendulum</Heading>

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
            {!timerStarted ? 'Start' : 'Pause'}
          </Button>
          <ConfirmDialog
            triggerLabel="Reset"
            triggerButtonProps={{
              background: 'blue.300',
              marginX: 5,
              disabled: !timerStarted,
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
                setTimerStarted(false);
                setTime(value);
                setSelectedTime(value);
              }}
              variant={selectedTime === value ? 'outline' : 'solid'}
            >
              {display}
            </Button>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default Timer;
