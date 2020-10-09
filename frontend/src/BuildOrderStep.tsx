import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {StepRenderer, IBuildOrderStep} from "./types";
import BuildOrderIcon from "./StepIcon";


const kindMapping: {[id:string]: StepRenderer} = {
  "create": (step) => {
    const from = step.from ? `${step.from} -> `:null;
    const target = step.target ? <BuildOrderIcon icon={step.target}/> : null;
    return <>
      <BuildOrderIcon icon={"villager"}/> {step.number} {from}{target}
    </>;
  },
  "move": (step) => {
    const number = step.number?step.number:null;
    const from = step.from?<BuildOrderIcon icon={step.from}/>:null;
    return <>
      {from}{number}<FontAwesomeIcon icon={faArrowRight}/><BuildOrderIcon icon={step.target || "sheep"}/>
    </>
  },
  "build": (step) => {
    const times = step.buildAmount?` x ${step.buildAmount}`:null;
    const target = step.target ? <BuildOrderIcon icon={step.target}/> : null;
    const newVillager = step.newVillager || true;
    const buildVillagerFirst = newVillager? <><BuildOrderIcon icon={"villager"}/><FontAwesomeIcon icon={faArrowRight}/></>:null;
    return <>
      {buildVillagerFirst}<BuildOrderIcon icon={step.build || "house"}/>{times}<FontAwesomeIcon icon={faArrowRight}/>{target}
    </>
  },
  "default": (step) => {
    const from = step.from ? `${step.from} -> `:null;
    const target = step.target ? <BuildOrderIcon icon={step.target}/> : null;
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
