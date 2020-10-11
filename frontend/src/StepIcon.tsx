import React from "react";

export interface IBuildOrderIconProps {
  icon: string,
  scale?: number
}

const iconPositions = [
  'wood',
  'food',
  'gold',
  'barracks',
  'sheep',
  'villager',
  'boar',
  'tree',
  'mill',
  'villagerf',
  'berries',
  'age2',
  'house',
  'loom',
  'stone',
  'population'
];


const BuildOrderIcon:React.FC<IBuildOrderIconProps> = ({icon, scale}) => {
  const classes = `buildorderstep-icon ${icon}`;
  scale = scale || 50;
  let position = iconPositions.findIndex((currentIcon) => {
    return currentIcon === icon.toLowerCase();
  });
  if(position < 0){
    position = 0;
  }
  const positionX = position;
  const positionY = 0;
  const style = {
    backgroundPositionY: `${positionY * -scale}px`,
    backgroundPositionX: `${positionX * -scale}px`
  }
  return <div className={classes} style={style}>
    {icon}
  </div>;
}

export default BuildOrderIcon;
