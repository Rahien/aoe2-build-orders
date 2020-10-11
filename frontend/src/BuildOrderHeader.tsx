import React from 'react';
import BuildOrderIcon from "./StepIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {IBuildOrder} from "./types";
interface IBuildOrderHeaderProps {
  playing: boolean,
  buildOrder: IBuildOrder,
  togglePlaying: (event:React.MouseEvent) => void
}
const BuildOrderHeader:React.FC<IBuildOrderHeaderProps> = ({playing, togglePlaying, buildOrder}) => {
  const playPauseIcon = playing?faPause:faPlay;
  const scale = 31;
  const foodCount = buildOrder.currentFood;
  const woodCount = buildOrder.currentWood;
  const goldCount = buildOrder.currentGold;
  const stoneCount = buildOrder.currentStone;
  const popCount = (buildOrder.currentVillagers || 0) + (buildOrder.currentMilitaryPop || 0);
  const showMenu = () => {
    console.log('menu open');
  }
  return <div className="buildorder-header">
    <BuildOrderIcon icon={"food"} scale={scale} text={foodCount}/>
    <BuildOrderIcon icon={"wood"} scale={scale} text={woodCount}/>
    <BuildOrderIcon icon={"gold"} scale={scale} text={goldCount}/>
    <BuildOrderIcon icon={"stone"} scale={scale} text={stoneCount}/>
    <BuildOrderIcon icon={"population"} scale={scale} text={popCount}/>
    <div className="control" onClick={togglePlaying}>
      <FontAwesomeIcon icon={playPauseIcon}/>
    </div>
    <div className="control" onClick={showMenu}>
      <FontAwesomeIcon icon={faEllipsisH}/>
    </div>
  </div>
}

export default BuildOrderHeader;
