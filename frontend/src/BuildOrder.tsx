import React from 'react';
import BuildOrderStep from "./BuildOrderStep";
import BuildOrderTracker from "./BuildOrderTracker";
import BuildOrderHeader from "./BuildOrderHeader";
import usePlayingState from "./BuildOrderPlayingStateHook";

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
    target: "second-boar"
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
    target: "wood"
  },
  {
    kind: "create",
    target: "wood"
  },
  {
    kind: "loom"
  },
  {
    kind: "age2"
  }
];



function BuildOrder() {
  const [startTime, playing, timeAlreadyPlayed, togglePlaying] = usePlayingState();
  const steps = buildOrderSteps.map((step, index) => {
    return <div className="buildorder-step-wrap" key={index}>
      <BuildOrderStep step={step}/>
    </div>;
  });
  return (
    <div className="buildOrder">
      <BuildOrderHeader playing={playing} togglePlaying={togglePlaying}/>
      {steps}
      <BuildOrderTracker buildOrderSteps={buildOrderSteps} startTime={startTime} elapsedTime={timeAlreadyPlayed}/>
    </div>
  );
}

export default BuildOrder;
