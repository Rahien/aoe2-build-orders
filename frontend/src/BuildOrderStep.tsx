import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import {StepRenderer, IBuildOrderStep} from "./types";
import BuildOrderIcon from "./StepIcon";


const kindMapping: {[id:string]: StepRenderer} = {
  "create": (step) => {
    const target = step.target ? <BuildOrderIcon icon={step.target} text={step.targetText}/> : null;
    const number = step.number ? <span className="number">x {step.number}</span> : null;
    return <>
      <BuildOrderIcon icon={"villager"}/>
      {number}
      <FontAwesomeIcon icon={faCaretRight}/>
      {target}
    </>;
  },
  "move": (step) => {
    const number = step.number ? <span className="number">x {step.number}</span> : null;
    const from = step.from?<BuildOrderIcon icon={step.from}/>:null;
    return <>
      {from}
      {number}
      <FontAwesomeIcon icon={faCaretRight}/>
      <BuildOrderIcon icon={step.target || "sheep"} text={step.targetText}/>
    </>
  },
  "build": (step) => {
    const times = step.buildAmount?<span className="number">{` x ${step.buildAmount}`}</span>:null;
    const target = step.target ? <BuildOrderIcon icon={step.target}/> : null;
    const newVillager = typeof step.newVillager === "undefined"?true:step.newVillager;
    const moveAmount = step.number?<span className="number">{` x ${step.number}`}</span>:null;
    const buildVillagerFirst = newVillager? <><BuildOrderIcon icon={"villager"}/><FontAwesomeIcon icon={faCaretRight}/></>:null;
    return <>
      {buildVillagerFirst}
      {times}
      <BuildOrderIcon icon={step.build || "house"}/>
      <FontAwesomeIcon icon={faCaretRight}/>
      {moveAmount}
      {target}
    </>
  },
  "default": (step) => {
    const from = step.from ? `${step.from} -> `:null;
    const target = step.target ? <BuildOrderIcon icon={step.target} text={step.targetText}/> : null;
    return <>
      <BuildOrderIcon icon={step.kind}/> {step.number} {from}{target}
    </>;
  }
}

export interface IBuildOrderStepProps {
  step: IBuildOrderStep
}

const BuildOrderStep:React.FC<IBuildOrderStepProps> = ({step}) => {
  const stepInfo = (kindMapping[step.kind] || kindMapping['default'])(step);
  const endTime = step.endTime || 0;
  let endTimeMinutes = ""+Math.floor(endTime/60);
  endTimeMinutes = endTimeMinutes.length>1?endTimeMinutes:`0${endTimeMinutes}`;
  let endTimeSeconds = ""+Math.floor(endTime%60);
  endTimeSeconds = endTimeSeconds.length>1?endTimeSeconds:`0${endTimeSeconds}`;
  return <div className="buildorderstep">
    {stepInfo}
    <label className="end-time">[{endTimeMinutes}:{endTimeSeconds}]</label>
  </div>;
}

export default BuildOrderStep;

export const getStepDuration = (step:IBuildOrderStep) => {
  if(step.kind === "move"){
    return 0;
  }
  if(step.kind === "create"){
    return 25;
  }
  if(step.kind === "build"){
    return step.newVillager!==false?25:0;

  }
  if(step.kind === "loom"){
    return 25;
  }
  if(step.kind === "age2"){
    return 130;
  }
  return 0;
}
