import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {IBuildOrder, IBuildOrderStep} from "./types";
import {getMessageForStep, getStepDuration} from "./BuildOrderStep";
import {useSetting} from "./hooks";
const speech = window.speechSynthesis;

interface IBuildOrderTrackerProps {
  buildOrder: IBuildOrder,
  startTime: Date | null,
  elapsedTime: number,
  onNewBuildOrderState: (buildOrder: IBuildOrder) => void,
  playing: boolean,
  gameTimeChange: (time:number) => void
}

interface ICompletion {
  completedSteps: IBuildOrderStep[],
  uncompletedSteps: IBuildOrderStep[],
  currentStepPercentage: number
}

function computeTrackerPosition(completion: ICompletion):[number,boolean] {
  let offset = 106;
  const currentPosition = parseFloat(window.getComputedStyle(document.querySelectorAll(".buildorder-tracker")[0]).getPropertyValue("top"));
  const topLevelSteps = document.querySelectorAll(".buildOrder > .buildorder-step-wrap");
  completion.completedSteps.forEach((step, index) => {
    const elementHeight = topLevelSteps[index].scrollHeight;
    offset += elementHeight;
  });
  const currentStepElement = topLevelSteps[completion.completedSteps.length];
  const currentStepHeight = currentStepElement?currentStepElement.scrollHeight:0;
  offset += (completion.currentStepPercentage * currentStepHeight);
  const changed = Math.abs(currentPosition - offset) >= 1;
  return [offset, changed];
}
const gameSpeed = 5/3;
const getCompletion:(buildOrderSteps: IBuildOrderStep[], timeSinceStart:number) => ICompletion = (buildOrderSteps, timeSinceStart) => {
  const completedSteps:IBuildOrderStep[] = [];
  const uncompletedSteps:IBuildOrderStep[] = [];
  let timeDifferenceLeft = timeSinceStart;
  let currentStepPercentage = 0;
  buildOrderSteps.forEach((step) => {
    const duration = getStepDuration(step);
    if(timeDifferenceLeft >= duration && uncompletedSteps.length === 0){
      timeDifferenceLeft = Math.round(timeDifferenceLeft - duration);
      completedSteps.push(step);
    }else if(timeDifferenceLeft > 0){
      currentStepPercentage = timeDifferenceLeft/duration;
      timeDifferenceLeft = Math.round(timeDifferenceLeft - duration);
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

const onNewStep = (buildOrder:IBuildOrder, settings:{[id:string]: any}) => {
  speakNewStepsOutLoud(buildOrder, settings);
}

const speakNewStepsOutLoud = (buildOrder:IBuildOrder, settings:{[id:string]: any}) => {
  const readStepOutLoud = settings.readStepsOutLoud;
  if(!readStepOutLoud || !speech){
    return;
  }
  let zeroTimeStepsToDoFirst:IBuildOrderStep[] = [];
  let seenCurrentStep = false;
  const currentStep = buildOrder.currentStep;
  if(!currentStep){
    return;
  }
  buildOrder.steps.forEach((step) => {
    if(step === currentStep){
      seenCurrentStep = true;
    }
    if(seenCurrentStep){
      return;
    }
    const duration = getStepDuration(step);
    if(duration > 0){
      zeroTimeStepsToDoFirst = [];
    }else{
      zeroTimeStepsToDoFirst.push(step);
    }

  });
  let message = "";
  if(zeroTimeStepsToDoFirst.length > 0){
    zeroTimeStepsToDoFirst.forEach((step) => {
      message += `${getMessageForStep(step)},\n`
    });
    message += ", Then, ";
  }
  const utterance = new SpeechSynthesisUtterance(message + getMessageForStep(currentStep));
  utterance.lang = 'en-GB';
  speech.speak(utterance);
}

const handleBuildOrderStateChange = (currentBuildOrder:IBuildOrder, completion: ICompletion,
                                     settings:{[id:string]: any},
                                     onNewBuildOrderState: (buildOrder: IBuildOrder) => void) => {
  const {uncompletedSteps, currentStepPercentage} = completion;
  const newBuildOrder = Object.assign({}, currentBuildOrder);
  newBuildOrder.currentStep = uncompletedSteps[0];
  newBuildOrder.currentStepPercentage = currentStepPercentage;
  if(newBuildOrder.currentStep !== currentBuildOrder.currentStep){
    onNewStep(newBuildOrder, settings);
  }
  onNewBuildOrderState(newBuildOrder);
};

const BuildOrderTracker:React.FC<IBuildOrderTrackerProps> = ({buildOrder, startTime, elapsedTime, playing, onNewBuildOrderState, gameTimeChange}) => {
  const [trackerPosition, setTrackerPosition] = useState(0);
  const readStepsOutLoud = useSetting<boolean>("readStepsOutLoud", true)
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const timeSinceStart = getTimeSinceStart(startTime, elapsedTime);
      gameTimeChange(timeSinceStart);
      const completion = getCompletion(buildOrder.steps, timeSinceStart);
      const [newPosition, changed] = computeTrackerPosition(completion);
      handleBuildOrderStateChange(buildOrder, completion, {readStepsOutLoud: readStepsOutLoud}, onNewBuildOrderState);
      if(changed){
        setTrackerPosition(newPosition);
        const tracker = document.getElementsByClassName("buildorder-tracker")[0];
        try{
          tracker && tracker.scrollIntoView({behavior: "smooth", block: "center"});
        }catch (e){
          tracker && tracker.scrollIntoView();
        }
      }
    }, 350);
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
