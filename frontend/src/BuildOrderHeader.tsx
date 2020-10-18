import React, {useEffect, useRef, useState} from 'react';
import BuildOrderIcon from "./StepIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {IBuildOrder} from "./types";
import GameTimeClock from "./GameTimeClock";
import BuildOrderMenu from "./BuildOrderMenu";
interface IBuildOrderHeaderProps {
  playing: boolean,
  buildOrder: IBuildOrder,
  togglePlaying: (event:React.MouseEvent) => void,
  gameTime:number,
  setGameTime: (time:number) => void
}
const BuildOrderHeader:React.FC<IBuildOrderHeaderProps> = ({playing, togglePlaying, buildOrder, gameTime, setGameTime}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const current = menuRef.current;
      if (current && !current.contains(event.target as HTMLElement)) {
        console.log('outside');
        setShowMenu(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
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
  return <div className="buildorder-header">
    <div className="flex">
      <BuildOrderIcon icon={buildOrder.icon} scale={30}/>
      <div className="buildorder-name">{buildOrder.name}</div>
      <div className="control" onClick={toggleMenu} ref={menuRef}>
        <FontAwesomeIcon icon={faEllipsisH}/>
        {showMenu?
          <BuildOrderMenu build={buildOrder}
                          restartBuild={() => setGameTime(0.1)}
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
        <div className="control" onClick={togglePlaying}>
          <FontAwesomeIcon icon={playPauseIcon}/>
        </div>
      </div>
    </div>

  </div>
}

export default BuildOrderHeader;
