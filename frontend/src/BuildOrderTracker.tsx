import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {IBuildOrder, IBuildOrderStep} from "./types";
import {getStepDuration} from "./BuildOrderStep";

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

const computeTrackerPosition = (completion: ICompletion) => {
  let offset = 106;
  let stepHeight = 102;
  offset += (completion.completedSteps.length * stepHeight);
  offset += (completion.currentStepPercentage * stepHeight);
  return offset;
}
const gameSpeed = 1.7;
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

const handleBuildOrderStateChange = (currentBuildOrder:IBuildOrder, completion: ICompletion,
                                     onNewBuildOrderState: (buildOrder: IBuildOrder) => void) => {
  const {uncompletedSteps, currentStepPercentage} = completion;
  const newBuildOrder = Object.assign({}, currentBuildOrder);
  newBuildOrder.currentStep = uncompletedSteps[0];
  newBuildOrder.currentStepPercentage = currentStepPercentage;
  onNewBuildOrderState(newBuildOrder);
};

const BuildOrderTracker:React.FC<IBuildOrderTrackerProps> = ({buildOrder, startTime, elapsedTime, onNewBuildOrderState, gameTimeChange}) => {
  const [trackerPosition, setTrackerPosition] = useState(0);
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const timeSinceStart = getTimeSinceStart(startTime, elapsedTime);
      gameTimeChange(timeSinceStart);
      const completion = getCompletion(buildOrder.steps, timeSinceStart);
      setTrackerPosition(computeTrackerPosition(completion));
      handleBuildOrderStateChange(buildOrder, completion, onNewBuildOrderState);
      if(startTime){
        const tracker = document.getElementsByClassName("buildorder-tracker")[0];
        tracker && tracker.scrollIntoView({behavior: "smooth", block: "center"});
      }
    }, 200);
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
