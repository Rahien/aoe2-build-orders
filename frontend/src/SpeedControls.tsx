import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward, faForward} from "@fortawesome/free-solid-svg-icons";
import {useLongPress} from "./hooks";

interface ISpeedControlsProps {
  gameTime:number,
  setGameTime: (time:number, pause?:boolean) => void
}

const SpeedControls:React.FC<ISpeedControlsProps> = ({gameTime, setGameTime}) => {
  const step = 5;
  const handleRewind = (times:number) => {
    setGameTime(gameTime - step*times, false);
  }
  const handleFastForward = (times:number) => {
    setGameTime(gameTime + step*times, false);
  }

  const buildStepHandler = (handler:(times:number) => void) => {
    return (times:number) => {
      handler(times);
    };
  }
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 300,
  };
  const longPressEventForward = useLongPress(buildStepHandler(handleFastForward), buildStepHandler(handleFastForward), defaultOptions);
  const longPressEventBackward = useLongPress(buildStepHandler(handleRewind), buildStepHandler(handleRewind), defaultOptions);

  return <>
    <div className="speedcontrol-button back" {...longPressEventBackward}>
      <FontAwesomeIcon icon={faBackward}/>
    </div>
    <div className="speedcontrol-button forward" {...longPressEventForward}>
      <FontAwesomeIcon icon={faForward}/>
    </div>
  </>
}

export default SpeedControls;
