import React from 'react';
import BuildOrderStep from "./BuildOrderStep";

const buildOrderSteps = [
  {
    kind: "move",
    number: 4,
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
  const steps = buildOrderSteps.map((step, index) => {
    return <BuildOrderStep step={step} key={index}/>
  });
  return (
    <div className="buildOrder">
      {steps}
    </div>
  );
}

export default BuildOrder;
