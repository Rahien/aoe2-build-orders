import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {IBuildOrder, IBuildOrderStep} from "./types";

interface IBuildOrderTrackerProps {
  buildOrder: IBuildOrder,
  startTime: Date | null,
  elapsedTime: number,
  onNewBuildOrderState: (buildOrder: IBuildOrder) => void,
  gameTimeChange: (time:number) => void
}

interface ICompletion {
  completedSteps: IBuildOrderStep[],
  uncompletedSteps: IBuildOrderStep[],
  currentStepPercentage: number
}

const computeTrackerPosition = (completedSteps:IBuildOrderStep[], currentStepPercentage:number) => {
  let offset = 112;
  let stepHeight = 102;
  offset += (completedSteps.length * stepHeight);
  offset += (currentStepPercentage * stepHeight);
  return offset;
}
const gameSpeed = 10.7;
const getCompletion:(buildOrderSteps: IBuildOrderStep[], timeSinceStart:number) => ICompletion = (buildOrderSteps, timeSinceStart) => {
  const completedSteps:IBuildOrderStep[] = [];
  const uncompletedSteps:IBuildOrderStep[] = [];
  let timeDifferenceLeft = timeSinceStart;
  let currentStepPercentage = 0;
  buildOrderSteps.forEach((step) => {
    const duration = getStepDuration(step);
    if(timeDifferenceLeft > duration){
      timeDifferenceLeft -= duration;
      completedSteps.push(step);
    }else if(timeDifferenceLeft > 0){
      currentStepPercentage = timeDifferenceLeft/duration;
      timeDifferenceLeft -= duration;
      uncompletedSteps.push(step);
    }else{
      uncompletedSteps.push(step);
    }
  });
  return {completedSteps, uncompletedSteps, currentStepPercentage};
};

const getTimeSinceStart: (startTime: (Date | null), elapsedTime: number) => number = (startTime, elapsedTime) => {
  if(!startTime){
    startTime = new Date();
  }
  let timeSinceStart = gameSpeed * (new Date().getTime() - startTime.getTime())/ 1000;
  timeSinceStart = timeSinceStart + elapsedTime;
  return timeSinceStart;
}

const getStepDuration = (step:IBuildOrderStep) => {
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

const handleBuildOrderStateChange = (currentBuildOrder:IBuildOrder, completedSteps: IBuildOrderStep[], onNewBuildOrderState: (buildOrder: IBuildOrder) => void) => {
  if(completedSteps.length === 0 && !currentBuildOrder.currentStone){
    return;
  }
  if(completedSteps.length > 0 && completedSteps[completedSteps.length - 1] === currentBuildOrder.currentStep){
    return;
  }
  const newBuildOrder = Object.assign({}, currentBuildOrder);
  if(completedSteps.length === 0){
    newBuildOrder.currentStep = undefined;
  }else{
    newBuildOrder.currentStep = completedSteps[completedSteps.length - 1];
  }
  onNewBuildOrderState(newBuildOrder);
};

const BuildOrderTracker:React.FC<IBuildOrderTrackerProps> = ({buildOrder, startTime, elapsedTime, onNewBuildOrderState, gameTimeChange}) => {
  const [trackerPosition, setTrackerPosition] = useState(0);
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const timeSinceStart = getTimeSinceStart(startTime, elapsedTime);
      gameTimeChange(timeSinceStart);
      const {completedSteps, currentStepPercentage} = getCompletion(buildOrder.steps, timeSinceStart);
      setTrackerPosition(computeTrackerPosition(completedSteps, currentStepPercentage));
      handleBuildOrderStateChange(buildOrder, completedSteps, onNewBuildOrderState);
      if(startTime){
        const tracker = document.getElementsByClassName("buildorder-tracker")[0];
        tracker && tracker.scrollIntoView({block: "center"});
      }
    }, 50);
    return () => clearTimeout(timeout);
  } );
  const style = {
    top: `${trackerPosition}px`
  };
  return <div className="buildorder-tracker" style={style}>
    <FontAwesomeIcon icon={faChevronRight}/>
    <div className="line"></div>
    <FontAwesomeIcon icon={faChevronLeft}/>
  </div>;
}

export default BuildOrderTracker;
