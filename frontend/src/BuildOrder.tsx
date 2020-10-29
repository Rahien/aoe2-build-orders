import React, {useEffect, useRef, useState} from 'react';
import BuildOrderStep, {getStepDuration} from "./BuildOrderStep";
import BuildOrderTracker from "./BuildOrderTracker";
import BuildOrderHeader from "./BuildOrderHeader";
import usePlayingState from "./BuildOrderPlayingStateHook";
import {IBuildOrder, IBuildOrderStep, IResourceChange, ISortableBuildOrderStep} from "./types";
import {getBuildOrder} from "./BuildOrderList";
import { useParams } from 'react-router-dom';
import SpeedControls from "./SpeedControls";
import {v4} from "uuid";

export const stepKinds: {[id:string]:string} = {
 "create": "Create Villager",
 "build": "Build",
 "loom": "Get Loom",
 "move": "Move",
 "research": "Research",
 "age2": "Feudal Age",
 "age3": "Castle Age"
}

const addResourcesFromStep = (buildOrder:IBuildOrder, step:IBuildOrderStep, percentageComplete: number = 1) => {
  if(step.kind === "create" || (step.kind === "build" && ['villager', 'villagerf'].indexOf(step.from || "") >= 0)){
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

export const computeStartingVillagers = (buildOrder: IBuildOrder) => {
  let count = 0;
  const stepsToCheck = ([] as IBuildOrderStep[]).concat(buildOrder.steps);
  let seenCreate = false;
  stepsToCheck.forEach((step) => {
    if(seenCreate){
      return;
    }
    if(step.kind === "create") {
      seenCreate = true;
      return;
    }
    count += (step.number || 0);
  });

  if(count === 0){
    return 4;
  }
  return count;
}

export const addResourcesUpToCurrentStep = (buildOrder:IBuildOrder, gameTime:number) => {
  let currentStepSeen = false;
  buildOrder.currentVillagers = computeStartingVillagers(buildOrder);
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

export const computeResourceChanges = (buildOrderSteps:IBuildOrderStep[]) => {
  const resources:{[id:string]: number} = {food: 0, wood: 0, gold: 0, stone: 0};
  const resourcesToTrack = Object.keys(resources);
  buildOrderSteps.forEach((step) => {
    const number = step.number || 1;
    step.resourceChanges = [] as IResourceChange[];
    let from = step.from;
    if(from && ["boar", "sheep", "berries", "farm"].indexOf(from) >= 0){
      from = "food";
    }
    let to = step.target;
    if(to && ["boar", "secondboar", "sheep", "berries", "farm"].indexOf(to) >= 0){
      to = "food";
    }
    if(from === to){
      return;
    }
    if (from && resourcesToTrack.indexOf(from) >= 0) {
      let newResource = (resources[from] || 0) - number;
      resources[from] = newResource
      step.resourceChanges.push({
        resource: from,
        target: newResource,
        direction: "down"
      });

    }
    if(to && resourcesToTrack.indexOf(to) >= 0){
      let newResourceTo = (resources[to] || 0) + number;
      resources[to] = newResourceTo
      step.resourceChanges.push({
        resource: to,
        target: newResourceTo,
        direction: "up"
      });
    }
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

export const unfoldSubsteps: (steps: IBuildOrderStep[]) => ISortableBuildOrderStep[] = (buildOrderSteps) => {
  const newSteps:IBuildOrderStep[] = [];
  buildOrderSteps.forEach((step) => {
    newSteps.push(step);
    if(step.subSteps) {
      step.subSteps.forEach((substep) => {
        newSteps.push(substep);
      });
    }
    delete step.subSteps;
  });
  const sortableSteps:ISortableBuildOrderStep[] = newSteps.map((step:any) => {
    step.id = v4();
    return step as ISortableBuildOrderStep;
  });
  return sortableSteps;
}

const requestWakeLock = (wakeLockRef:any) => {
  if ('wakeLock' in window.navigator) {
    try {
      // @ts-ignore
      window.navigator.wakeLock.request('screen').then((wakeLock:any) => {
        wakeLockRef.current = wakeLock;
      });
    } catch (err) {
    }
  }
}

const releaseWakeLock = (wakeLockRef:any) => {
  wakeLockRef.current && wakeLockRef.current.release();
}

const computeEndTime:(buildOrder:IBuildOrder) => number = (buildOrder) => {
  try{
    return buildOrder.steps[buildOrder.steps.length - 1].endTime || 0;
  }catch (e){
    return 0;
  }
}

function BuildOrder() {
  const [startTime, playing, timeAlreadyPlayed, togglePlaying, updateGameTime] = usePlayingState();
  const [gameTime, setGameTime] = useState(0);
  const [buildOrder, setBuildOrder] = useState<IBuildOrder|null>(null);
  const wakeLockRef = useRef<any>();
  const {id} = useParams();
  useEffect(() => {
    const build = getBuildOrder(id);
    addResourcesUpToCurrentStep(build, 0);
    build.steps = mergeSubsteps(build.steps);
    setBuildOrder(build)
  }, [id]);
  useEffect(() => {
    if(playing){
      requestWakeLock(wakeLockRef);
    }else{
      releaseWakeLock(wakeLockRef);
    }
    return () => {
      releaseWakeLock(wakeLockRef);
    }
  }, [playing, wakeLockRef]);

  if(!buildOrder){
    return <div>Loading</div>;
  }

  const changeGameTime = (time:number, pause= true, withUpdate = true) => {
    const endTime = computeEndTime(buildOrder)
    time = Math.min(endTime, Math.max(time, 0));
    setGameTime(time);
    if(time === endTime){
      togglePlaying(gameTime, false);
    }
    if(withUpdate){
      updateGameTime(time, pause);
    }
  }

  const onNewBuildOrderState = (newBuildOrder:IBuildOrder) => {
    addResourcesUpToCurrentStep(newBuildOrder, gameTime);
    setBuildOrder(newBuildOrder);
  };
  const steps = buildOrder.steps.map((step, index) => {
    return <div className="buildorder-step-wrap" key={index}>
      <BuildOrderStep step={step} setGameTime={changeGameTime}/>
    </div>;
  });
  const showTracker = timeAlreadyPlayed || playing;
  return (
    <div className="buildOrder">
      <BuildOrderHeader playing={playing} togglePlaying={() => togglePlaying(gameTime)}
                        buildOrder={buildOrder} gameTime={gameTime} setGameTime={changeGameTime}/>
      {steps}
      {showTracker?<BuildOrderTracker buildOrder={buildOrder} startTime={startTime}
                         elapsedTime={timeAlreadyPlayed}
                         playing={playing}
                         gameTimeChange={(time) => changeGameTime(time, false, false)}
                         onNewBuildOrderState={onNewBuildOrderState}/>:null}
      {playing?<SpeedControls gameTime={gameTime} setGameTime={changeGameTime}/>:null}
    </div>
  );
}

export default BuildOrder;
