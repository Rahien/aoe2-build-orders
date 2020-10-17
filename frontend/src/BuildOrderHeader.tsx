import React from 'react';
import BuildOrderIcon from "./StepIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {IBuildOrder} from "./types";
import GameTimeClock from "./GameTimeClock";
interface IBuildOrderHeaderProps {
  playing: boolean,
  buildOrder: IBuildOrder,
  togglePlaying: (event:React.MouseEvent) => void,
  gameTime:number,
  setGameTime: (time:number) => void
}
const BuildOrderHeader:React.FC<IBuildOrderHeaderProps> = ({playing, togglePlaying, buildOrder, gameTime, setGameTime}) => {
  const playPauseIcon = playing?faPause:faPlay;
  const scale = 31;
  const foodCount = buildOrder.currentFood;
  const woodCount = buildOrder.currentWood;
  const goldCount = buildOrder.currentGold;
  const stoneCount = buildOrder.currentStone;
  const popCount = (buildOrder.currentVillagers || 0) + (buildOrder.currentMilitaryPop || 0);
  const showMenu = () => {
    console.log('menu open');
  };
  return <div className="buildorder-header">
    <div className="flex">
      <div className="buildorder-name">{buildOrder.name}</div>
      <div className="control" onClick={showMenu}>
        <FontAwesomeIcon icon={faEllipsisH}/>
      </div>
    </div>
    <div className="flex">
      <div className="resources">
        <BuildOrderIcon icon={"food"} scale={scale} text={foodCount}/>
        <BuildOrderIcon icon={"wood"} scale={scale} text={woodCount}/>
        <BuildOrderIcon icon={"gold"} scale={scale} text={goldCount}/>
        <BuildOrderIcon icon={"stone"} scale={scale} text={stoneCount}/>
        <BuildOrderIcon icon={"population"} scale={scale} text={popCount}/>
      </div>
      <div className="time">
        <GameTimeClock gameTime={gameTime} setGameTime={setGameTime}/>
        <div className="control" onClick={togglePlaying}>
          <FontAwesomeIcon icon={playPauseIcon}/>
        </div>
      </div>
    </div>

  </div>
}

export default BuildOrderHeader;
