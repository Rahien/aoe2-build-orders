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
      <BuildOrderIcon icon={step.femaleVillager?"villagerf":"villager"}/>
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
    const target = step.target ? <BuildOrderIcon icon={step.target} text={step.targetText}/> : null;
    const newVillager = step.from !== "nothing";
    const moveAmount = step.number?<span className="number">{` x ${step.number}`}</span>:null;
    const buildVillagerFirst = newVillager? <><BuildOrderIcon icon={step.femaleVillager?"villagerf":"villager"}/><FontAwesomeIcon icon={faCaretRight}/></>:null;
    const from = step.from && step.from !== "nothing"?<><BuildOrderIcon icon={step.from}/><FontAwesomeIcon icon={faCaretRight}/></>:null;
    return <>
      {buildVillagerFirst}
      {from}
      {times}
      <BuildOrderIcon icon={step.build || "house"}/>
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
    const from = step.from ? `${step.from} -> `:null;
    const target = step.target ? <BuildOrderIcon icon={step.target} text={step.targetText}/> : null;
    return <>
      <BuildOrderIcon icon={step.kind}/> {step.number} {from}{target}
    </>;
  }
}

export interface IBuildOrderStepProps {
  step: IBuildOrderStep,
  setGameTime?: (time:number) => void
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
    return typeof step.from === "undefined" ? 25:0;
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
  return 0;
}
