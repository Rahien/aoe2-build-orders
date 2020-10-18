import {IBuildOrder} from "./types";
import React from "react";
import BuildOrderIcon from "./StepIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faPlus} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {computeEndTimes, shuffleVillagerGenders} from "./BuildOrder";

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
  },
  "3": {
    name: "22 pop M@A > Archers",
    id: "3",
    icon: "manatarms",
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
        target: "boar",
        number: 2
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
        target: "sheep",
        number: 2
      },
      {
        kind: "build",
        build: "barracks",
        target: "builder"
      },
      {
        kind: "build",
        build: "militia",
        from: null,
        buildAmount: 3,
        duringPrevious: true
      },

      {
        kind: "build",
        build: "house",
        target: "gold"
      },
      {
        kind: "create",
        target: "gold"
      },
      {
        kind: "loom"
      },
      {
        kind:"move",
        from: "sheep",
        target: "wood",
        number: 7
      },
      {
        kind:"move",
        from: "sheep",
        target: "farm",
        number: 2
      },
      {
        kind: "age2"
      },
      {
        kind: "research",
        techs: ['doublebitaxe', 'manatarmsupgrade']
      },
      {
        kind: "create",
        target: "wood"
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
        from: null,
        build: "archer",
        buildAmount: 20,
        duringPrevious: true
      },
      {
        kind: "build",
        from: "builder",
        build: "blacksmith"
      },
      {
        kind:"create",
        target: "gold",
        number: 4
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
        number: 13
      },
      {
        kind:"wheelbarrow",
      },
      {
        kind: "age3"
      }
    ]
  }
};


export function getBuildOrder(id:string){
  const build = buildOrders[id];
  computeEndTimes(build.steps);
  shuffleVillagerGenders(build.steps);
  return build;
}

export function setBuildOrder(id:string, build:IBuildOrder){
  if(buildOrders[id]){
    Object.assign(buildOrders[id], build);
  }else{
    buildOrders[id] = build;
  }
  buildOrders[id].id = id;
}

export function deleteBuildOrder(id:string){
  delete buildOrders[id];
}

const newBuildOrder = () => {
  const id = uuidv4();
  buildOrders[id] = {
    name: "new build order",
    startingVillagers: 4,
    id: id,
    icon: Math.random() < 0.5?"villager":"villagerf",
    steps: []
  };
  return id;
}

function BuildOrderList() {
  const history = useHistory();

  const handleNewBuildClick = () => {
    const id = newBuildOrder();
    history.push(`/edit-build/${id}`);
  }

  const goToBuild = (build: IBuildOrder) => {
    history.push(`/build/${build.id}`);
  }

  const list = Object.values(buildOrders).map((build) => {
    return <div key={build.id} className="buildorder list-item" onClick={() => goToBuild(build)}>
      <BuildOrderIcon icon={build.icon}/>
      <label>{build.name}</label>
      <div className="control" onClick={(event) => {
        history.push(`/edit-build/${build.id}`);
        event.preventDefault();
        event.stopPropagation();
      }}>
        <FontAwesomeIcon icon={faPencilAlt}/>
      </div>
    </div>;
  });
  return (
    <div className="buildorder-list">
      <h1>AoE2 Build Orders</h1>
      {list}
      <button onClick={handleNewBuildClick}>
        <FontAwesomeIcon icon={faPlus}/><span>New Build</span>
      </button>
    </div>
  );
}

export default BuildOrderList;
