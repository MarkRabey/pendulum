const formatTimer = (time: number) =>
  `${
    Math.floor(time / 60) < 10
      ? `0${Math.floor(time / 60)}`
      : `${Math.floor(time / 60)}`
  }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`;

export default formatTimer;
