import {useState} from "react";

const usePlayingState:(() => [(Date|null),boolean,number,(gameTime:number) => void]) = () => {
  const [startTime, setStartTime] = useState<Date|null>(null);
  const [timeAlreadyPlayed, setTimeAlreadyPlayed] = useState(0);

  const togglePlaying = (gameTime:number) => {
    if(startTime){
      setTimeAlreadyPlayed(gameTime);
      setStartTime(null);
    }else{
      setStartTime(new Date());
    }
  };
  return [startTime, !!startTime, timeAlreadyPlayed, togglePlaying];
};

export default usePlayingState;