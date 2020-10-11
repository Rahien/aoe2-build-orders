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
  return <div className="buildorderstep">
    {stepInfo}
  </div>;
}

export default BuildOrderStep;
