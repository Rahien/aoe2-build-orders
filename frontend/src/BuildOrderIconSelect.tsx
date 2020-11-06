import React, { useState} from "react";
import BuildOrderIcon, {iconNames} from "./StepIcon";
import {useClickOutside} from "./hooks";

const resourceIcons = [
  'food',
  'wood',
  'gold',
  'stone',
  'sheep',
  'boar',
  'berries',
  'farm',
  'deer',
  'fish',
  'tree',
  'population'
];

const unitIcons = [
  'villager',
  'villagerf',
  'militia',
  'spear',
  'pikeman',
  'manatarms',
  'eagle',
  'eagle warrior',
  'skirmisher',
  'archer',
  'elite skirmisher',
  'crossbow',
  'ca',
  'scout',
  'light cav',
  'knight',
  'camel',
  'lancer',
  'elephant',
  'ram',
  'mango',
  'scorpion',
  'unique',
  'fishingship',
  'galley',
  'fireship',
  'demo',
  'monk'
];

const buildingIcons = [
  'builder',
  'house',
  'mill',
  'lumbercamp',
  'miningcamp',
  'barracks',
  'range',
  'stable',
  'dock',
  'market',
  'blacksmith',
  'siegeworkshop',
  'krepost',
  'monastery',
  'castle',
  'tc',
  'university',
  'tower'
];

const researchIcons = [
  'loom',
  'doublebitaxe',
  'horsecollar',
  'wheelbarrow',
  'manatarmsupgrade',
  'eagle warriorupgrade',
  'crossbowupgrade',
  'elite skirmisherupgrade',
  'pikemanupgrade',
  'forging',
  'scale mail',
  'scale barding',
  'padded armor',
  'fletching',
  'bodkin',
  'ballistics',
  'chemistry',
  'age2',
  'age3',
  'age4',
  'silver crown',
  'gold crown'
];

const otherIcons = iconNames.filter((name) => {
  return resourceIcons.indexOf(name) < 0 &&
    unitIcons.indexOf(name) < 0 &&
    buildingIcons.indexOf(name) < 0 &&
    researchIcons.indexOf(name) < 0;
});

interface BuildOrderIconSelectProps {
  icon?:string,
  allowText?: boolean,
  text?:string,
  onIconSelect: (icon?:string, text?:string) => void
}

const BuildOrderIconSelect:React.FC<BuildOrderIconSelectProps> = ({icon, text, allowText, onIconSelect}) => {
  if(!icon){
    icon = "nothing";
  }
  const classes = `edit-buildorderstep-icon`;
  const [selecting, setSelecting] = useState(false);
  const [newText, setNewText] = useState(text);
  const menuRef = useClickOutside(() => {
    setSelecting(false);
  })
  function makeOptionList(name:string, icons:string[]){
    const options = icons.map((option) => {
      return <div key={option} className="icon-option" onClick={() => {
        onIconSelect(option);
        setSelecting(false);
      }}>
        <BuildOrderIcon icon={option}/>
      </div>
    });
    return <div className="icon-select-group">
      <label>{name}</label>
      {options}
    </div> ;
  }
  let selectIcon = null;
  if(selecting){
    selectIcon = <div className="select-icon-wrap">
     <div className="select-icon" ref={menuRef}>
      {allowText?<input value={newText}
             onChange={(e) => setNewText(e.target.value)}
             onKeyDown={(e) => {
               if(e.key === "enter"){
                 onIconSelect(icon, newText);
               }
             }}/>:null}
       <div className="flex">
         <div className="left">
           {makeOptionList('Resources', resourceIcons)}
           {makeOptionList('Units', unitIcons)}
         </div>
         <div className="right">
           {makeOptionList('Buildings', buildingIcons)}
           {makeOptionList('Research', researchIcons)}
           {makeOptionList('Other', otherIcons)}
         </div>
       </div>
     </div>
    </div>
  }
  return <div className={classes}>
    <div className="icon-wrap" onClick={() => setSelecting(!selecting)}>
      <BuildOrderIcon icon={icon} text={text}/>
      {text?<label>{text}</label>:null}
    </div>
    {selectIcon}
  </div>
}

export default BuildOrderIconSelect;
