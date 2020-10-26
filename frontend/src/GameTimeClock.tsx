import React, {ChangeEvent, useEffect, useState} from "react";

interface IGameTimeClockProps {
  gameTime: number,
  setGameTime: (time:number) => void
}

const GameTimeClock:React.FC<IGameTimeClockProps> = ({gameTime, setGameTime}) => {
  const [gameTimeMinutes, setGameTimeMinutes] = useState("00");
  const [gameTimeSeconds, setGameTimeSeconds] = useState("00");
  useEffect(() => {
    let gameTimeMinutesTemp = ""+Math.floor(gameTime / 60)
    gameTimeMinutesTemp = gameTimeMinutesTemp.length > 1?gameTimeMinutesTemp:`0${gameTimeMinutesTemp}`;
    let gameTimeSecondsTemp = ""+(Math.floor(gameTime) % 60);
    gameTimeSecondsTemp = gameTimeSecondsTemp.length > 1?gameTimeSecondsTemp:`0${gameTimeSecondsTemp}`;
    setGameTimeMinutes(gameTimeMinutesTemp);
    setGameTimeSeconds(gameTimeSecondsTemp);
  }, [gameTime]);

  const updateGameTimeMinutes = ((event:React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== "Enter") {
      return;
    }
    const value = event.currentTarget.value || "00";
    setGameTime((parseInt(value)*60) + parseInt(gameTimeSeconds))
  });

  const updateGameTimeSeconds = ((event:React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== "Enter") {
      return;
    }
    const value = event.currentTarget.value || "00";

    setGameTime((parseInt(gameTimeMinutes)*60) + parseInt(value))
  });
  const putGameTimeMinutes = ((event:ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setGameTimeMinutes(value);
  });

  const putGameTimeSeconds = ((event:ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setGameTimeSeconds(value);
  });
  return <div className="time-display">
    <input type="number" onKeyDown={updateGameTimeMinutes}
           step={1} min={0} value={gameTimeMinutes}
           onChange={putGameTimeMinutes}/>
    <span>:</span>
    <input type="number" onKeyDown={updateGameTimeSeconds}
           step={1} min={0} max={60} value={gameTimeSeconds}
           onChange={putGameTimeSeconds}/>
  </div>
};

export default GameTimeClock;