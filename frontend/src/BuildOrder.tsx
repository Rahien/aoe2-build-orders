import React, {useState} from 'react';
import BuildOrderStep, {getStepDuration} from "./BuildOrderStep";
import BuildOrderTracker from "./BuildOrderTracker";
import BuildOrderHeader from "./BuildOrderHeader";
import usePlayingState from "./BuildOrderPlayingStateHook";
import {IBuildOrder, IBuildOrderStep} from "./types";

const buildOrderSteps = [
  {
    kind: "build",
    build: "house",
    buildAmount: 2,
    from: null,
    number: 4,
    target: "sheep"
  },
  {
    kind: "create",
    number: 2,
    target: "sheep"
  },
  {
    kind: "create",
    target: "wood",
    number: 3
  },
  {
    kind: "create",
    target: "boar"
  },
  {
    kind: "build",
    build: "house",
    buildAmount: 2,
    target: "berries"
  },
  {
    kind: "build",
    build: "mill",
    target: "berries"
  },
  {
    kind: "create",
    target: "berries",
  },
  {
    kind:"move",
    from: "boar",
    target: "boar",
    targetText: "2"
  },
  {
    kind: "create",
    target: "berries"
  },
  {
    kind: "create",
    target: "boar",
    number: 6
  },
  {
    kind: "loom"
  },
  {
    kind:"move",
    from: "sheep",
    target: "wood",
    number: 5
  },
  {
    kind: "age2"
  },
  {
    kind: "build",
    build: "barracks",
    from: "sheep",
    target: "builder",
    duringPrevious: true
  },
  {
    kind: "research",
    techs: ['doublebitaxe', 'horsecollar']
  },
  {
    kind:"move",
    from: "sheep",
    target: "farm",
    number: 6
  },
  {
    kind:"create",
    target: "farm",
    number: 8
  },
  {
    kind:"move",
    from: "berries",
    target: "gold",
    number: 4
  },
  {
    kind:"build",
    from: "builder",
    build: "blacksmith"
  },
  {
    kind: "wheelbarrow"
  },
  {
    kind: "age3"
  }
];

const exampleBuildOrder:IBuildOrder = {
  name: "21 pop Scouts",
  startingVillagers: 4,
  steps: buildOrderSteps
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

const addResourcesUpToCurrentStep = (buildOrder:IBuildOrder, gameTime:number) => {
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

const computeEndTimes = (buildOrderSteps:IBuildOrderStep[]) => {
  let time = 0;
  buildOrderSteps.forEach((step) => {
    time += getStepDuration(step);
    step.endTime = time;
  });
}

const mergeSubsteps: (steps: IBuildOrderStep[]) => IBuildOrderStep[] = (buildOrderSteps) => {
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

const shuffleVillagerGenders: (steps: IBuildOrderStep[]) => void = (steps) => {
  steps.forEach((step) => {
    step.femaleVillager = Math.random() < 0.5;
  });
}

computeEndTimes(exampleBuildOrder.steps);
shuffleVillagerGenders(exampleBuildOrder.steps);

function BuildOrder() {
  const [startTime, playing, timeAlreadyPlayed, togglePlaying, updateGameTime] = usePlayingState();
  const [gameTime, setGameTime] = useState(0);
  addResourcesUpToCurrentStep(exampleBuildOrder, gameTime);
  exampleBuildOrder.steps = mergeSubsteps(exampleBuildOrder.steps);
  const [buildOrder, setBuildOrder] = useState<IBuildOrder>(exampleBuildOrder);
  const onNewBuildOrderState = (newBuildOrder:IBuildOrder) => {
    addResourcesUpToCurrentStep(newBuildOrder, gameTime);
    setBuildOrder(newBuildOrder);
  };
  const steps = buildOrder.steps.map((step, index) => {
    return <div className="buildorder-step-wrap" key={index}>
      <BuildOrderStep step={step}/>
    </div>;
  });
  return (
    <div className="buildOrder">
      <BuildOrderHeader playing={playing} togglePlaying={() => togglePlaying(gameTime)}
                        buildOrder={buildOrder} gameTime={gameTime} setGameTime={updateGameTime}/>
      {steps}
      <BuildOrderTracker buildOrder={buildOrder} startTime={startTime}
                         elapsedTime={timeAlreadyPlayed}
                         gameTimeChange={setGameTime}
                         onNewBuildOrderState={onNewBuildOrderState}/>
    </div>
  );
}

export default BuildOrder;
