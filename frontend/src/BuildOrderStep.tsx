import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCaretRight,faLongArrowAltDown,faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import {StepRenderer, IBuildOrderStep} from "./types";
import BuildOrderIcon from "./StepIcon";


const kindMapping: {[id:string]: StepRenderer} = {
  "create": (step) => {
    const target = step.target ? <BuildOrderIcon icon={step.target} text={step.targetText}/> : null;
    const number = step.number ? <span className="number">x {step.number}</span> : null;
    return <>
      <BuildOrderIcon icon={step.femaleVillager?"villagerf":"villager"}/>
      {number}
      <FontAwesomeIcon icon={faCaretRight}/>
      {target}
    </>;
  },
  "move": (step) => {
    const number = step.number ? <span className="number">x {step.number}</span> : null;
    const fromIcon = step.from === "villager" && step.femaleVillager?"villagerf":step.from;
    const from = step.from && step.from !== "nothing"?<BuildOrderIcon icon={fromIcon}/>:null;
    return <>
      {from}
      {number}
      <FontAwesomeIcon icon={faCaretRight}/>
      <BuildOrderIcon icon={step.target || "sheep"} text={step.targetText}/>
    </>
  },
  "build": (step) => {
    const target = step.target ? <BuildOrderIcon icon={step.target} text={step.targetText}/> : null;
    const moveAmount = step.number?<span className="number">{` x ${step.number}`}</span>:null;
    const fromIcon = step.from === "villager" && step.femaleVillager?"villagerf":step.from;
    const from = step.from && step.from !== "nothing"?<><BuildOrderIcon icon={fromIcon}/><FontAwesomeIcon icon={faCaretRight}/></>:null;
    return <>
      {from}
      <BuildOrderIcon icon={step.build || "house"} text={step.buildAmount}/>
      {target && <FontAwesomeIcon icon={faCaretRight}/>}
      {moveAmount}
      {target}
    </>
  },
  "research": (step) => {
    const techs = (step.techs || []).map((tech) => {
      return <BuildOrderIcon key={tech} icon={tech}/>
    });
    return <>
      {techs}
    </>
  },
  "default": (step) => {
    return <>
      <BuildOrderIcon icon={step.kind}/>
    </>;
  }
}

export interface IBuildOrderStepProps {
  step: IBuildOrderStep,
  setGameTime?: (time:number) => void
}

const resourceChanges = function(step:IBuildOrderStep){
  const resourceChanges = step.resourceChanges;
  if(!resourceChanges || resourceChanges.length === 0){
    return null;
  }
  const changes = resourceChanges.map((change, index) => {
    const icon = change.direction === "up"? faLongArrowAltUp:faLongArrowAltDown;
    return <div className="change" key={index}>
      <FontAwesomeIcon icon={icon}/>
      <span className="number">{change.target}</span>
      <BuildOrderIcon scale={20} icon={change.resource}/>
    </div>
  });
  return <label className="resource-changes">
    {changes}
  </label>;
}

const BuildOrderStep:React.FC<IBuildOrderStepProps> = ({step, setGameTime}) => {
  const stepInfo = (kindMapping[step.kind] || kindMapping['default'])(step);
  const endTime = step.endTime || 0;
  let endTimeMinutes = ""+Math.floor(endTime/60);
  endTimeMinutes = endTimeMinutes.length>1?endTimeMinutes:`0${endTimeMinutes}`;
  let endTimeSeconds = ""+Math.floor(endTime%60);
  endTimeSeconds = endTimeSeconds.length>1?endTimeSeconds:`0${endTimeSeconds}`;
  const className = `buildorderstep ${step.kind}`;
  let subSteps = null;
  const handleClick = () => {
    if(setGameTime){
      setGameTime(step.endTime || 0);
    }
  }
  if(step.subSteps){
    subSteps = step.subSteps.map((subStep, index) => {
      return <BuildOrderStep key={index} step={subStep}/>;
    });
    subSteps = <div className="sub-steps">{subSteps}</div>;
  }

  return <div className={className} onClick={handleClick}>
    <div className="step-info">
      {stepInfo}
    </div>
    {subSteps}
    <label className="end-time">[{endTimeMinutes}:{endTimeSeconds}]</label>
    {resourceChanges(step)}
  </div>;
}

export default BuildOrderStep;

export const getStepDuration = (step:IBuildOrderStep) => {
  if(step.kind === "move"){
    return 0;
  }
  if(step.kind === "create"){
    return 25 * (step.number || 1);
  }
  if(step.kind === "build"){
    return ['villager', 'villagerf'].indexOf(step.from || "") >= 0? 25:0;
  }
  if(step.kind === "loom"){
    return 25;
  }
  if(step.kind === "age2"){
    return 130;
  }
  if(step.kind === "age3"){
    return 160;
  }
  if(step.kind === "wheelbarrow"){
    return 75;
  }
  return 0;
}

export const stepCanProduce = (step:IBuildOrderStep) => {
  return ['create', 'move', 'build'].indexOf(step.kind) >= 0;
}
