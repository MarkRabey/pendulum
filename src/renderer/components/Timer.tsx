import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const buttons = [
    {
      value: 900,
      display: '15 minutes',
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

  return (
    <div style={{ height: '100%' }}>
      <Flex
        background="gray.700"
        height="100%"
        alignItems="center"
        flexDirection="column"
      >
        <Text color="white" fontWeight="bold" marginTop="20" fontSize="35">
          Pendulum
        </Text>

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
        </Flex>

        <Flex marginTop={10}>
          {buttons.map(({ value, display }) => (
            <Button
              key={value}
              marginX={4}
              background="green.300"
              color="white"
              onClick={() => {
                setTimerStarted(false);
                setTime(value);
              }}
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
