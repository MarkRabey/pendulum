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
    <div>
      <h1>Pendulm</h1>
      {`${
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : `${Math.floor(time / 60)}`
      }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
      <div>
        <button type="button" onClick={toggleTimer}>
          {!timerStarted ? 'Start' : 'Pause'}
        </button>
      </div>

      <div>
        {buttons.map(({ value, display }) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setTimerStarted(false);
              setTime(value);
            }}
          >
            {display}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Timer;
