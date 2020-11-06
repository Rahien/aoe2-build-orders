import React from "react";

export interface IBuildOrderIconProps {
  icon?: string,
  scale?: number,
  text?: string|number
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
  'population',
  'eagle',
  'mango',
  'unique',
  'knight',
  'skirmisher',
  'archer',
  'militia',
  'manatarmsupgrade',
  'stable',
  'scout',
  'range',
  'wheelbarrow',
  'doublebitaxe',
  'manatarms',
  'light cav',
  'age3',
  'horsecollar',
  'market',
  'farm',
  'blacksmith',
  'elephant',
  'galley',
  'lancer',
  'ballistics',
  'builder',
  'fishingship',
  'miningcamp',
  'siegeworkshop',
  'dock',
  'krepost',
  'monastery',
  'castle',
  'tc',
  'lumbercamp',
  'university',
  'demo',
  'ram',
  'camel',
  'fireship',
  'scorpion',
  'monk',
  'spear',
  'ca',
  'tower',
  'chemistry',
  'fletching',
  'pikeman',
  'deer',
  'pikemanupgrade',
  'forging',
  'crossbowupgrade',
  'bodkin',
  'crossbow',
  'scale barding',
  'scale mail',
  'padded armor',
  'elite skirmisherupgrade',
  'elite skirmisher',
  'fish',
  'age4',
  'silver crown',
  'eagle warriorupgrade',
  'gold crown',
  'eagle warrior',
  'nothing'
];


const BuildOrderIcon:React.FC<IBuildOrderIconProps> = ({icon, scale, text}) => {
  if(!icon){
    icon = "villager";
  }
  const classes = `buildorderstep-icon ${icon}`;
  scale = scale || 50;
  let position = iconPositions.findIndex((currentIcon) => {
    return currentIcon === (icon||"").toLowerCase();
  });
  if(position < 0){
    icon = "nothing";
  }
  if(icon === "nothing"){
    return <div className="buildorderstep-icon nothing">
      <span className="icon-text"></span>
      {text?<label>{text}</label>:null}
    </div>;
  }

  const positionX = Math.floor(position % 20);
  const positionY = Math.floor(position / 20);
  const style = {
    backgroundPositionY: `${positionY * -scale}px`,
    backgroundPositionX: `${positionX * -scale}px`
  }
  return <div className={classes} style={style}>
    <span className="icon-text">{icon}</span>
    {text?<label>{text}</label>:null}
  </div>;
}

export default BuildOrderIcon;
export const iconNames = iconPositions;
