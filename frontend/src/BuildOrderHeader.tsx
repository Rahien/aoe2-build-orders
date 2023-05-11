import React, { useState } from "react";
import BuildOrderIcon from "./StepIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { IBuildOrder } from "./types";
import GameTimeClock from "./GameTimeClock";
import BuildOrderMenu from "./BuildOrderMenu";
import { useClickOutside } from "./hooks";
interface IBuildOrderHeaderProps {
  buildOrder: IBuildOrder;
  gameTime: number;
  setGameTime: (time: number) => void;
}
const BuildOrderHeader: React.FC<IBuildOrderHeaderProps> = ({
  buildOrder,
  gameTime,
  setGameTime,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useClickOutside(() => {
    setShowMenu(false);
  });
  const scale = 30;
  const foodCount = buildOrder.currentFood;
  const woodCount = buildOrder.currentWood;
  const goldCount = buildOrder.currentGold;
  const stoneCount = buildOrder.currentStone;
  const popCount =
    (buildOrder.currentVillagers || 0) + (buildOrder.currentMilitaryPop || 0);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="buildorder-header">
      <div className="flex">
        <BuildOrderIcon icon={buildOrder.icon} scale={30} />
        <div className="buildorder-name">{buildOrder.name}</div>
        <div className="control" onClick={toggleMenu} ref={menuRef}>
          <FontAwesomeIcon icon={faEllipsisH} />
          {showMenu ? (
            <BuildOrderMenu
              build={buildOrder}
              restartBuild={() => setGameTime(0)}
              hideMenu={() => setShowMenu(false)}
            />
          ) : null}
        </div>
      </div>
      <div className="flex">
        <div className="resources">
          <BuildOrderIcon icon={"food"} scale={scale} text={foodCount} />
          <BuildOrderIcon icon={"wood"} scale={scale} text={woodCount} />
          <BuildOrderIcon icon={"gold"} scale={scale} text={goldCount} />
          <BuildOrderIcon icon={"stone"} scale={scale} text={stoneCount} />
          <BuildOrderIcon icon={"population"} scale={scale} text={popCount} />
        </div>
        <div className="time">
          <GameTimeClock gameTime={gameTime} setGameTime={setGameTime} />
        </div>
      </div>
    </div>
  );
};

export default BuildOrderHeader;
