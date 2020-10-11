import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {IBuildOrderStep} from "./types";

interface IBuildOrderTrackerProps {
  buildOrderSteps: IBuildOrderStep[],
  startTime: Date | null,
  elapsedTime: number
}

const computeTrackerPosition = (startTime:Date|null, elapsedTime:number, buildOrderSteps:IBuildOrderStep[]) => {
  let offset = 70;
  if(!startTime){
    startTime = new Date();
  }
  let timeDifferenceLeft = (new Date().getTime() - startTime.getTime())/ 1000;
  timeDifferenceLeft = timeDifferenceLeft + elapsedTime;
  let stepHeight = 102;
  buildOrderSteps.forEach((step) => {
    const duration = getStepDuration(step);
    if(timeDifferenceLeft > duration){
      timeDifferenceLeft -= duration;
      offset += stepHeight;
    }else if(timeDifferenceLeft > 0){
      offset += stepHeight * (timeDifferenceLeft/duration)
      timeDifferenceLeft -= duration;
    }
  });
  return offset;
}

const getStepDuration = (step:IBuildOrderStep) => {
  if(step.kind === "move"){
    return 0;
  }
  if(step.kind === "create"){
    return 25;
  }
  if(step.kind === "build"){
    return 25;

  }
  if(step.kind === "loom"){
    return 25;
  }
  if(step.kind === "age2"){
    return 130;
  }
  return 0;
}

const BuildOrderTracker:React.FC<IBuildOrderTrackerProps> = ({buildOrderSteps, startTime, elapsedTime}) => {
  const [trackerPosition, setTrackerPosition] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setTrackerPosition(computeTrackerPosition(startTime, elapsedTime, buildOrderSteps));
      const tracker = document.getElementsByClassName("buildorder-tracker")[0];
      tracker && tracker.scrollIntoView({block: "center"});
    }, 100);
  });
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
