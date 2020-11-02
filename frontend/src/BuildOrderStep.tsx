import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCaretRight,faLongArrowAltDown,faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import {StepRenderer, IBuildOrderStep, StepStringRenderer} from "./types";
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
    let target = step.target ? <BuildOrderIcon icon={step.target} text={step.targetText}/> : null;
    const createAmount = step.number && step.number > 1?<span className="number">{` x ${step.number}`}</span>:null;
    const fromIcon = step.from === "villager" && step.femaleVillager?"villagerf":step.from;
    const from = step.from && step.from !== "nothing"?<><BuildOrderIcon icon={fromIcon}/>{createAmount}<FontAwesomeIcon icon={faCaretRight}/></>:null;
    if((!step.from || step.from === "nothing") && step.target && step.number){
      target = <>{target}{createAmount}</>
    }
    return <>
      {from}
      <BuildOrderIcon icon={step.build || "house"} text={step.buildAmount}/>
      {target && <FontAwesomeIcon icon={faCaretRight}/>}
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

function randomFromArray<T>(list:T[]):T {
  return list[Math.floor(Math.random()*list.length)];
}

function replaceVariablesInText(text:string, variables:any): string{
  let result = text;
  Object.keys(variables).forEach((key) => {
    result = result.split(`$${key}`).join(variables[key]);
  });
  result = result.split("move it to builder").join("make it a builder");
  result = result.split("move them to builder").join("make them builders");
  result = result.split("Move one villager from boar to boar").join("lure the second boar");
  return result;
}

const kindMessageMapping: {[id:string]: StepStringRenderer} = {
  "create": (step) => {
    let message;
    if(step.number && step.number > 1){
      const taskNtoResource = randomFromArray(["The next $number villagers should go to $target", "Send the next $number villagers to $target"]);
      message = replaceVariablesInText(taskNtoResource, {target: step.target, number: step.number});
    }else{
      const task1toResource = randomFromArray(["The next villager should go to $target", "Send the next villager to $target"]);
      message = replaceVariablesInText(task1toResource, {target: step.target});
    }
    return message;
  },
  "move": (step) => {
    let message;
    if(step.number && step.number > 1){
      const taskNtoResource = randomFromArray(["Move $number villagers from $from to $target"]);
      message = replaceVariablesInText(taskNtoResource, {
        target: step.target,
        from: step.from,
        number: step.number
      });
    }else{
      const task1toResource = randomFromArray(["Move one villager from $from to $target"]);
      message = replaceVariablesInText(task1toResource, {
        from: step.from,
        target: step.target
      });
    }
    return message;
  },
  "build": (step) => {
    let message;
    if(step.from && ["villager", "villagerf"].indexOf(step.from) >= 0){
      message = "the next villager should build";
    }else if(step.from && ["nothing", "builder"].indexOf(step.from) < 0){
      message = "order one villager from $from to build";
    }else if(step.number && step.number > 1) {
      message = "$number villagers should build";
    }else {
      message = "order a villager to build";
    }
    if(step.buildAmount && step.buildAmount > 1){
      message = `${message} ${step.buildAmount}`
    } else {
      message = `${message} $anOrA`;
    }
    if(step.buildAmount && step.buildAmount > 1){
      message = `${message} $builds`
    }else{
      message = `${message} $build`
    }
    if(step.target && step.target !== "nothing"){
      message = `${message}. Then move to $target`;
    }
    return replaceVariablesInText(message, {
      from: step.from,
      target: step.target,
      number: step.number,
      anOrA: "aoeiuy".indexOf(step.build?.charAt(0) || "z") > 0?"an":"a",
      build: step.build || "house"
    });
  },
  "research": (step) => {
    return `research ${(step.techs || []).join(",")}`;
  },
  "wheelbarrow": (step) => {
    return `research wheelbarrow`;
  },
  "age2": (step) => {
    return `go up to feudal age`;
  },
  "age3": (step) => {
    return `go up to castle age`;
  },
  "loom": (step) => {
    return `research loom`;
  },"default": (step) => {
    return 'next step';
  }
}

export function getMessageForStep(step:IBuildOrderStep):string{
  let renderer = kindMessageMapping[step.kind];
  if(!renderer){
    renderer = kindMessageMapping["default"];
  }
  let message = renderer(step);
  if(step.subSteps && step.subSteps.length > 0){
    message += "\n. Meanwhile, ";
    step.subSteps.forEach((substep) => {
      message += getMessageForStep(substep) +",\n";
    })
  }
  return message;
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

const computeStepMarks = function(step:IBuildOrderStep){
  if(!stepCanProduceVils(step)){
    return;
  }
  if(step.kind === "build" && ["villager", "villagerf"].indexOf(step.from || "") < 0){
    return;
  }
  const marks = [];
  const vilCount = step.number || 1;
  while(marks.length <= vilCount){
    marks.push(<div className="step-marker" key={marks.length}></div>)
  }
  return <div className="step-marks">{marks}</div>;
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

  const stepMarks = computeStepMarks(step);

  return <div className={className} onClick={handleClick}>
    <div className="step-info">
      {stepInfo}
    </div>
    {subSteps}
    <label className="end-time">[{endTimeMinutes}:{endTimeSeconds}]</label>
    {resourceChanges(step)}
    {stepMarks}
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

export const stepCanProduceVils = (step:IBuildOrderStep) => {
  return ['create', 'build'].indexOf(step.kind) >= 0;
}
