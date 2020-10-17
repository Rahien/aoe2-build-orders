import {IBuildOrder, IBuildOrderStep} from "./types";
import React from "react";
import {getStepDuration} from "./BuildOrderStep";
import BuildOrderIcon from "./StepIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

const buildOrders:{[id:string]: IBuildOrder} = {
  "1": {
    name: "21 pop Scouts",
    id: "1",
    icon: "scout",
    startingVillagers: 4,
    steps: [
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
        number: 7
      },
      {
        kind:"create",
        target: "farm",
        number: 10
      },
      {
        kind:"move",
        from: "berries",
        target: "gold",
        number: 4
      },
      {
        kind:"create",
        target: "gold",
        number: 1
      },
      {
        kind:"create",
        target: "farm",
        number: 2
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
    ]
  },
  "2": {
    name: "23 pop Archers",
    id: "2",
    icon: "archer",
    startingVillagers: 4,
    steps: [
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
        number: 4
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
        number: 2
      },
      {
        kind: "move",
        from: "boar",
        target: "farm"
      },
      {
        kind: "create",
        target: "wood",
        number: 5
      },
      {
        kind: "loom"
      },
      {
        kind:"move",
        from: "sheep",
        target: "wood",
        number: 2
      },
      {
        kind:"move",
        from: "sheep",
        target: "gold",
        number: 3
      },
      {
        kind: "age2"
      },
      {
        kind: "build",
        build: "barracks",
        from: "wood",
        target: "builder",
        duringPrevious: true
      },
      {
        kind: "research",
        techs: ['doublebitaxe', 'horsecollar']
      },
      {
        kind: "build",
        from: "berries",
        build: "range",
        buildAmount: 2,
        number: 2,
        target: "gold"
      },
      {
        kind: "build",
        from: "builder",
        build: "blacksmith"
      },
      {
        kind:"create",
        target: "gold",
        number: 3
      },
      {
        kind: "move",
        from: "berries",
        target: "farm",
        number: 2
      },
      {
        kind:"create",
        target: "farm",
        number: 10
      },
      {
        kind:"wheelbarrow",
      },
      {
        kind:"create",
        target: "farm",
        number: 2
      },
      {
        kind: "age3"
      }
    ]
  }
};


const shuffleVillagerGenders: (steps: IBuildOrderStep[]) => void = (steps) => {
  steps.forEach((step) => {
    step.femaleVillager = Math.random() < 0.5;
  });
}

const computeEndTimes = (buildOrderSteps:IBuildOrderStep[]) => {
  let time = 0;
  buildOrderSteps.forEach((step) => {
    time += getStepDuration(step);
    step.endTime = time;
  });
}

export function getBuildOrder(id:string){
  const build = buildOrders[id];
  computeEndTimes(build.steps);
  shuffleVillagerGenders(build.steps);
  return build;
}

function BuildOrderList() {
  const handleDownload = (build:IBuildOrder) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(build, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", build.name + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const list = Object.values(buildOrders).map((build) => {
    return <a key={build.id} className="buildorder list-item" href={`/build/${build.id}`}>
      <BuildOrderIcon icon={build.icon}/>
      <label>{build.name}</label>
      <div className="control" onClick={(event) => {
        handleDownload(build);
        event.preventDefault();
        event.stopPropagation();
      }}>
        <FontAwesomeIcon icon={faDownload}/>
      </div>
    </a>;
  });
  return (
    <div className="buildorder-list">
      <h1>Build Orders</h1>
      {list}
    </div>
  );
}

export default BuildOrderList;
