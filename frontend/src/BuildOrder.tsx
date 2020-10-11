import React, {useState} from 'react';
import BuildOrderStep from "./BuildOrderStep";
import BuildOrderTracker from "./BuildOrderTracker";
import BuildOrderHeader from "./BuildOrderHeader";
import usePlayingState from "./BuildOrderPlayingStateHook";
import {IBuildOrder, IBuildOrderStep} from "./types";

const buildOrderSteps = [
  {
    kind: "build",
    build: "house",
    buildAmount: 2,
    newVillager: false,
    number: 4,
    target: "sheep"
  },
  {
    kind: "create",
    target: "sheep"
  },
  {
    kind: "create",
    target: "sheep"
  },
  {
    kind: "create",
    target: "wood"
  },
  {
    kind: "create",
    target: "wood"
  },
  {
    kind: "create",
    target: "wood"
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
    target: "boar"
  },
  {
    kind: "create",
    target: "boar"
  },
  {
    kind: "create",
    target: "boar"
  },
  {
    kind: "create",
    target: "boar"
  },
  {
    kind: "create",
    target: "boar"
  },
  {
    kind: "create",
    target: "boar"
  },
  {
    kind: "loom"
  },
  {
    kind:"move",
    from: "boar",
    target: "wood",
    number: 5
  },
  {
    kind: "age2"
  }
];

const exampleBuildOrder = {
  name: "21 pop Scouts",
  startingVillagers: 4,
  steps: buildOrderSteps
}

const addResourcesFromStep = (buildOrder:IBuildOrder, step:IBuildOrderStep) => {
  if(step.kind === "create" || (step.kind === "build" && step.newVillager !== false)){
    buildOrder.currentVillagers = (buildOrder.currentVillagers || 0) + 1;
  }
  if(step.target){
    const number = step.number || 1;
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
    const number = step.number || 1;
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

};

const addResourcesUpToCurrentStep = (buildOrder:IBuildOrder) => {
  let currentStepSeen = false;
  buildOrder.currentVillagers = buildOrder.startingVillagers;
  buildOrder.currentStone = 0;
  buildOrder.currentGold = 0;
  buildOrder.currentWood = 0;
  buildOrder.currentFood = 0;
  buildOrder.steps.forEach((step) => {
    if(currentStepSeen || !buildOrder.currentStep){
      return;
    }
    if(step === buildOrder.currentStep){
      currentStepSeen = true;
    }
    addResourcesFromStep(buildOrder, step);
  });
};

function BuildOrder() {
  const [startTime, playing, timeAlreadyPlayed, togglePlaying] = usePlayingState();
  addResourcesUpToCurrentStep(exampleBuildOrder);
  const [gameTime, setGameTime] = useState(0);
  const [buildOrder, setBuildOrder] = useState<IBuildOrder>(exampleBuildOrder);
  const onNewBuildOrderState = (newBuildOrder:IBuildOrder) => {
    addResourcesUpToCurrentStep(newBuildOrder);
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
                        buildOrder={buildOrder} gameTime={gameTime}/>
      {steps}
      <BuildOrderTracker buildOrder={buildOrder} startTime={startTime}
                         elapsedTime={timeAlreadyPlayed}
                         gameTimeChange={setGameTime}
                         onNewBuildOrderState={onNewBuildOrderState}/>
    </div>
  );
}

export default BuildOrder;
