import React, {useEffect, useState} from 'react';
import BuildOrderStep, {getStepDuration} from "./BuildOrderStep";
import BuildOrderTracker from "./BuildOrderTracker";
import BuildOrderHeader from "./BuildOrderHeader";
import usePlayingState from "./BuildOrderPlayingStateHook";
import {IBuildOrder, IBuildOrderStep} from "./types";
import {getBuildOrder} from "./BuildOrderList";
import { useParams } from 'react-router-dom';

export const stepKinds: {[id:string]:string} = {
 "create": "Create Villager",
 "build": "Build",
 "loom": "Get Loom",
 "move": "Move",
 "age2": "Feudal Age",
 "age3": "Castle Age"
}

const addResourcesFromStep = (buildOrder:IBuildOrder, step:IBuildOrderStep, percentageComplete: number = 1) => {
  if(step.kind === "create" || (step.kind === "build" && (typeof step.from === "undefined"))){
    const number = Math.floor((step.number || 1) * percentageComplete);
    buildOrder.currentVillagers = (buildOrder.currentVillagers || 0) + number;
  }
  if(step.target){
    const number = Math.floor((step.number || 1) * percentageComplete);
    if(['sheep', 'berries', 'farm', 'boar'].indexOf(step.target) >= 0){
      buildOrder.currentFood = (buildOrder.currentFood || 0) + number;
    }
    if(step.target === "wood"){
      buildOrder.currentWood = (buildOrder.currentWood || 0) + number;
    }
    if(step.target === "gold"){
      buildOrder.currentGold = (buildOrder.currentGold || 0) + number;
    }
    if(step.target === "stone"){
      buildOrder.currentStone = (buildOrder.currentStone || 0) + number;
    }
  }
  if(step.from){
    const number = Math.floor((step.number || 1) * percentageComplete);
    if(['sheep', 'berries', 'farm', 'boar'].indexOf(step.from) >= 0){
      buildOrder.currentFood = (buildOrder.currentFood || 0) - number;
    }
    if(step.from === "wood"){
      buildOrder.currentWood = (buildOrder.currentWood || 0) - number;
    }
    if(step.from === "gold"){
      buildOrder.currentGold = (buildOrder.currentGold || 0) - number;
    }
    if(step.from === "stone"){
      buildOrder.currentStone = (buildOrder.currentStone || 0) - number;
    }
  }
  if(step.subSteps){
    step.subSteps.forEach((step) => {
      addResourcesFromStep(buildOrder, step, percentageComplete);
    });
  }
};

export const addResourcesUpToCurrentStep = (buildOrder:IBuildOrder, gameTime:number) => {
  let currentStepSeen = false;
  buildOrder.currentVillagers = buildOrder.startingVillagers;
  buildOrder.currentStone = 0;
  buildOrder.currentGold = 0;
  buildOrder.currentWood = 0;
  buildOrder.currentFood = 0;
  buildOrder.steps.forEach((step) => {
    if(currentStepSeen && gameTime > 0){
      return;
    }
    if(step === buildOrder.currentStep && gameTime > 0){
      currentStepSeen = true;
    }
    addResourcesFromStep(buildOrder, step,
      currentStepSeen?buildOrder.currentStepPercentage:1);
  });
};

export const shuffleVillagerGenders: (steps: IBuildOrderStep[]) => void = (steps) => {
  steps.forEach((step) => {
    step.femaleVillager = Math.random() < 0.5;
  });
}

export const computeEndTimes = (buildOrderSteps:IBuildOrderStep[]) => {
  let time = 0;
  buildOrderSteps.forEach((step) => {
    time += getStepDuration(step);
    step.endTime = time;
  });
}

export const mergeSubsteps: (steps: IBuildOrderStep[]) => IBuildOrderStep[] = (buildOrderSteps) => {
  const newSteps:IBuildOrderStep[] = [];
  let previousStep:(IBuildOrderStep|null) = null;
  buildOrderSteps.forEach((step) => {
    if(step.duringPrevious && previousStep){
      previousStep.subSteps = previousStep.subSteps || [];
      previousStep.subSteps.push(step);
    }else{
      newSteps.push(step);
      previousStep = step;
    }
  });
  return newSteps;
}

function BuildOrder() {
  const [startTime, playing, timeAlreadyPlayed, togglePlaying, updateGameTime] = usePlayingState();
  const [gameTime, setGameTime] = useState(0);
  const [buildOrder, setBuildOrder] = useState<IBuildOrder|null>(null);
  const {id} = useParams();
  useEffect(() => {
    const build = getBuildOrder(id);
    addResourcesUpToCurrentStep(build, 0);
    build.steps = mergeSubsteps(build.steps);
    setBuildOrder(build)
  }, [id]);
  if(!buildOrder){
    return <div>Loading</div>;
  }

  const onNewBuildOrderState = (newBuildOrder:IBuildOrder) => {
    addResourcesUpToCurrentStep(newBuildOrder, gameTime);
    setBuildOrder(newBuildOrder);
  };
  const steps = buildOrder.steps.map((step, index) => {
    return <div className="buildorder-step-wrap" key={index}>
      <BuildOrderStep step={step} setGameTime={updateGameTime}/>
    </div>;
  });
  const showTracker = timeAlreadyPlayed || playing;
  return (
    <div className="buildOrder">
      <BuildOrderHeader playing={playing} togglePlaying={() => togglePlaying(gameTime)}
                        buildOrder={buildOrder} gameTime={gameTime} setGameTime={updateGameTime}/>
      {steps}
      {showTracker?<BuildOrderTracker buildOrder={buildOrder} startTime={startTime}
                         elapsedTime={timeAlreadyPlayed}
                         gameTimeChange={setGameTime}
                         onNewBuildOrderState={onNewBuildOrderState}/>:null}
    </div>
  );
}

export default BuildOrder;
