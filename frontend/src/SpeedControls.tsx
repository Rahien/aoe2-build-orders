import React, {useRef, useState} from 'react';
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

function readCountDown(readOutLoud: boolean, countDownFrom: number, countDownTimeout: React.MutableRefObject<null|number>){
  if(!readOutLoud || !window.speechSynthesis){
    return;
  }
  if(countDownFrom <= 0){
    const utterance = new SpeechSynthesisUtterance("Go!");
    utterance.lang = 'en-GB';
    window.speechSynthesis.speak(utterance);
  }else {
    const utterance = new SpeechSynthesisUtterance(""+countDownFrom);
    utterance.lang = 'en-GB';
    window.speechSynthesis.speak(utterance);
    countDownTimeout.current = window.setTimeout(() => {
      readCountDown(readOutLoud, countDownFrom - 1, countDownTimeout);
    }, 1000);
  }
}

const SpeedControls:React.FC<ISpeedControlsProps> = ({playing, buildOrder, togglePlaying, gameTime, setGameTime}) => {
  const step = 5;
  const [showCountDown, setShowCountDown] = useState(false);
  const countDownFrom = useSetting<number>("countDown", 3);
  const readStepsOutLoud = useSetting<boolean>("readStepsOutLoud", true)
  const countDownTimeout = useRef<number|null>(null);
  const clearReadCountDown = () => {
    countDownTimeout.current && clearTimeout(countDownTimeout.current);
  };
  const handleRewind = (times:number) => {
    let targetTime = gameTime - step*times;
    if(!playing){
      window.speechSynthesis && window.speechSynthesis.cancel();
      targetTime = getPreviousRelevantMoment(buildOrder, gameTime);
    }
    setGameTime(targetTime, false);
  }
  const handleFastForward = (times:number) => {
    let targetTime = gameTime + step*times;
    if(!playing){
      window.speechSynthesis && window.speechSynthesis.cancel();
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
      clearReadCountDown();
    }else if(gameTime < 0.5 && countDownFrom > 0){
      readCountDown(readStepsOutLoud, countDownFrom, countDownTimeout);
      setShowCountDown(true);
    }else{
      togglePlaying();
      readCountDown(readStepsOutLoud, 0, countDownTimeout);
    }
  };
  const playPauseIcon = playing?faPause:faPlay;

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 300,
  };
  const longPressEventForward = useLongPress(buildStepHandler(handleFastForward), buildStepHandler(handleFastForward), defaultOptions);
  const longPressEventBackward = useLongPress(buildStepHandler(handleRewind), buildStepHandler(handleRewind), defaultOptions);
  const disableContextMenu = (event:React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  return <div className="play-controls">
    <div className="speedcontrol-button back" {...longPressEventBackward} onContextMenu={disableContextMenu}>
      <FontAwesomeIcon icon={playing?faBackward:faFastBackward}/>
    </div>
    <div className="play-pause-control" onClick={clickPlayPause} onContextMenu={disableContextMenu}>
      <FontAwesomeIcon icon={playPauseIcon}/>
    </div>
    <div className="speedcontrol-button forward" {...longPressEventForward} onContextMenu={disableContextMenu}>
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
        clearReadCountDown();
        setShowCountDown(false);
      }}
    />: null}
  </div>
}

export default SpeedControls;
