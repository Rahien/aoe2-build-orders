import { useState } from "react";

const usePlayingState: () => [
  Date | null,
  boolean,
  number,
  (gameTime: number, playing?: boolean) => void,
  (gameTime: number, pause?: boolean) => void
] = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeAlreadyPlayed, setTimeAlreadyPlayed] = useState(0);

  const togglePlaying = (gameTime: number, newPlaying?: boolean) => {
    if (typeof newPlaying === "undefined") {
      if (startTime) {
        setTimeAlreadyPlayed(gameTime);
        setStartTime(null);
      } else {
        setStartTime(new Date());
      }
    } else {
      if (!newPlaying) {
        setTimeAlreadyPlayed(gameTime);
        setStartTime(null);
      } else {
        setStartTime(new Date());
      }
    }
  };
  const updateGameTime = (gameTime: number, pause = true) => {
    setTimeAlreadyPlayed(gameTime);
    if (pause) {
      setStartTime(null);
    } else if (startTime) {
      setStartTime(new Date());
    }
  };
  return [
    startTime,
    !!startTime,
    timeAlreadyPlayed,
    togglePlaying,
    updateGameTime,
  ];
};

export default usePlayingState;
