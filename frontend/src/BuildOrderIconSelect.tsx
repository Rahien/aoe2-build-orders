import React, { useState} from "react";
import BuildOrderIcon, {iconNames} from "./StepIcon";

interface BuildOrderIconSelectProps {
  icon?:string,
  allowText?: boolean,
  text?:string,
  onIconSelect: (icon?:string, text?:string) => void
}

const BuildOrderIconSelect:React.FC<BuildOrderIconSelectProps> = ({icon, text, allowText, onIconSelect}) => {
  if(!icon){
    icon = "villager";
  }
  const classes = `edit-buildorderstep-icon`;
  const [selecting, setSelecting] = useState(false);
  const [newText, setNewText] = useState(text);
  const options = iconNames.map((option) => {
    return <div key={option} className="icon-option" onClick={() => {
      onIconSelect(option);
      setSelecting(false);
    }}>
      <BuildOrderIcon icon={option}/>
    </div>
  });
  let selectIcon = null;
  if(selecting){
    // @ts-ignore
    selectIcon = <div className="select-icon">
      {allowText?<input value={newText}
             onChange={(e) => setNewText(e.target.value)}
             onKeyDown={(e) => {
               if(e.key === "enter"){
                 onIconSelect(icon, newText);
               }
             }}/>:null}
      {options}
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