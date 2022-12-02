import { Button, Flex } from '@chakra-ui/react';

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

interface IntervalSelectorProps {
  selectedTime: number;
  handleSetTime: (value: number) => void;
}

const IntervalSelector = ({
  selectedTime,
  handleSetTime,
}: IntervalSelectorProps) => (
  <Flex mt={10}>
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
);

export default IntervalSelector;
