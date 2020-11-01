import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward, faForward, faFastForward, faFastBackward, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {useLongPress, useSetting} from "./hooks";
import CountDown from "./CountDown";
import {IBuildOrder} from "./types";
import {
  getNextRelevantMoment,
  getPreviousRelevantMoment,
} from "./BuildOrder";

interface ISpeedControlsProps {
  playing: boolean,
  buildOrder: IBuildOrder,
  togglePlaying: () => void,
  gameTime:number,
  setGameTime: (time:number, pause?:boolean) => void
}

const SpeedControls:React.FC<ISpeedControlsProps> = ({playing, buildOrder, togglePlaying, gameTime, setGameTime}) => {
  const step = 5;
  const [showCountDown, setShowCountDown] = useState(false);
  const countDownFrom = useSetting<number>("countDown", 3);
  const handleRewind = (times:number) => {
    let targetTime = gameTime - step*times;
    if(!playing){
      targetTime = getPreviousRelevantMoment(buildOrder, gameTime);
    }
    setGameTime(targetTime, false);
  }
  const handleFastForward = (times:number) => {
    let targetTime = gameTime + step*times;
    if(!playing){
      targetTime = getNextRelevantMoment(buildOrder, gameTime);
    }
    setGameTime(targetTime, false);
  }

  const buildStepHandler = (handler:(times:number) => void) => {
    return (times:number) => {
      handler(times);
    };
  }
  const clickPlayPause = () => {
    if(playing){
      togglePlaying();
      setShowCountDown(false);
    }else if(gameTime < 0.5 && countDownFrom > 0){
      setShowCountDown(true);
    }else{
      togglePlaying();
    }
  };
  const playPauseIcon = playing?faPause:faPlay;

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 300,
  };
  const longPressEventForward = useLongPress(buildStepHandler(handleFastForward), buildStepHandler(handleFastForward), defaultOptions);
  const longPressEventBackward = useLongPress(buildStepHandler(handleRewind), buildStepHandler(handleRewind), defaultOptions);

  return <div className="play-controls">
    <div className="speedcontrol-button back" {...longPressEventBackward}>
      <FontAwesomeIcon icon={playing?faBackward:faFastBackward}/>
    </div>
    <div className="play-pause-control" onClick={clickPlayPause}>
      <FontAwesomeIcon icon={playPauseIcon}/>
    </div>
    <div className="speedcontrol-button forward" {...longPressEventForward}>
      <FontAwesomeIcon icon={playing?faForward:faFastForward}/>
    </div>
    {showCountDown?<CountDown
      from={countDownFrom}
      onDone={() => {
        togglePlaying();
        setShowCountDown(false);
      }}
      onClick={() => {
        togglePlaying();
        setShowCountDown(false);
      }}
    />: null}
  </div>
}

export default SpeedControls;
