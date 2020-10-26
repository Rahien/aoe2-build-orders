import React, {useState} from 'react';
import BuildOrderIcon from "./StepIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {IBuildOrder} from "./types";
import GameTimeClock from "./GameTimeClock";
import BuildOrderMenu from "./BuildOrderMenu";
import {useClickOutside} from "./hooks";
import CountDown from "./CountDown";
interface IBuildOrderHeaderProps {
  playing: boolean,
  buildOrder: IBuildOrder,
  togglePlaying: () => void,
  gameTime:number,
  setGameTime: (time:number) => void
}
const BuildOrderHeader:React.FC<IBuildOrderHeaderProps> = ({playing, togglePlaying, buildOrder, gameTime, setGameTime}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);
  const menuRef = useClickOutside(() => {
    setShowMenu(false);
  })
  const playPauseIcon = playing?faPause:faPlay;
  const scale = 30;
  const foodCount = buildOrder.currentFood;
  const woodCount = buildOrder.currentWood;
  const goldCount = buildOrder.currentGold;
  const stoneCount = buildOrder.currentStone;
  const popCount = (buildOrder.currentVillagers || 0) + (buildOrder.currentMilitaryPop || 0);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const clickPlayPause = () => {
    if(playing){
      togglePlaying();
      setShowCountDown(false);
    }else if(gameTime < 0.5){
      setShowCountDown(true);
    }else{
      togglePlaying();
    }
  };
  return <div className="buildorder-header">
    <div className="flex">
      <BuildOrderIcon icon={buildOrder.icon} scale={30}/>
      <div className="buildorder-name">{buildOrder.name}</div>
      <div className="control" onClick={toggleMenu} ref={menuRef}>
        <FontAwesomeIcon icon={faEllipsisH}/>
        {showMenu?
          <BuildOrderMenu build={buildOrder}
                          restartBuild={() => setGameTime(0)}
                          hideMenu={(() => setShowMenu(false))}/>
          :null}
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
        <div className="control" onClick={clickPlayPause}>
          <FontAwesomeIcon icon={playPauseIcon}/>
        </div>
      </div>
    </div>
    {showCountDown?<CountDown
      from={3}
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

export default BuildOrderHeader;
