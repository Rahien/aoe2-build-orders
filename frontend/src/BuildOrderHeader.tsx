import React from 'react';
import BuildOrderIcon from "./StepIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
interface IBuildOrderHeaderProps {
  playing: boolean,
  togglePlaying: (event:React.MouseEvent) => void
}
const BuildOrderHeader:React.FC<IBuildOrderHeaderProps> = ({playing, togglePlaying}) => {
  const playPauseIcon = playing?faPause:faPlay;
  const scale = 31;
  const showMenu = () => {
    console.log('menu open');
  }
  return <div className="buildorder-header">
    <BuildOrderIcon icon={"food"} scale={scale}/>
    <BuildOrderIcon icon={"wood"} scale={scale}/>
    <BuildOrderIcon icon={"gold"} scale={scale}/>
    <BuildOrderIcon icon={"stone"} scale={scale}/>
    <BuildOrderIcon icon={"population"} scale={scale}/>
    <div className="control" onClick={togglePlaying}>
      <FontAwesomeIcon icon={playPauseIcon}/>
    </div>
    <div className="control" onClick={showMenu}>
      <FontAwesomeIcon icon={faEllipsisH}/>
    </div>
  </div>
}

export default BuildOrderHeader;
