import {useState} from "react";

const usePlayingState:(() => [(Date|null),boolean,number,() => void]) = () => {
  const [startTime, setStartTime] = useState<Date|null>(null);
  const [timeAlreadyPlayed, setTimeAlreadyPlayed] = useState(0);

  const togglePlaying = () => {
    if(startTime){
      setTimeAlreadyPlayed(timeAlreadyPlayed + (new Date().getTime() - startTime.getTime())/1000);
      setStartTime(null);
    }else{
      setStartTime(new Date());
    }
  };
  return [startTime, !!startTime, timeAlreadyPlayed, togglePlaying];
};

export default usePlayingState;