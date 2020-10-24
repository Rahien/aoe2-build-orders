import {IBuildOrder} from "./types";
import React, {useState} from "react";
import BuildOrderIcon from "./StepIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH, faPencilAlt, faPlus} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {computeEndTimes, shuffleVillagerGenders} from "./BuildOrder";

import {defaultBuildOrders} from "./defaultBuildOrders";
import {useClickOutside} from "./hooks";
import MainMenu from "./MainMenu";

const ensureBuildOrders = () => {
  const availableBuildOrders = getBuildOrders();
  if(!availableBuildOrders || Object.keys(availableBuildOrders).length === 0){
    localStorage.setItem('buildOrders', JSON.stringify(defaultBuildOrders));
  }
}

ensureBuildOrders();

export function getBuildOrder(id:string){
  const buildOrders = getBuildOrders();
  const build = JSON.parse(JSON.stringify(buildOrders[id]));
  computeEndTimes(build.steps);
  shuffleVillagerGenders(build.steps);
  return build;
}

export function setBuildOrder(id:string, build:IBuildOrder){
  const buildOrders = getBuildOrders();
  if(buildOrders[id]){
    Object.assign(buildOrders[id], build);
  }else{
    buildOrders[id] = build;
  }
  buildOrders[id].id = id;
  localStorage.setItem('buildOrders', JSON.stringify(buildOrders));
}

export function deleteBuildOrder(id:string){
  const buildOrders = getBuildOrders();
  delete buildOrders[id];
  localStorage.setItem('buildOrders', JSON.stringify(buildOrders));
  ensureBuildOrders();
}

export function getBuildOrders():{[id:string]: IBuildOrder} {
  return JSON.parse(localStorage.getItem('buildOrders') || "{}");
}

const newBuildOrder = () => {
  const id = uuidv4();
  const buildOrder = {
    name: "new build order",
    id: id,
    icon: Math.random() < 0.5?"villager":"villagerf",
    steps: []
  };
  setBuildOrder(id, buildOrder);
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
  const [buildOrders] = useState(getBuildOrders());
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useClickOutside(() => {
    setShowMenu(false);
  })

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
      <h1>
        <span>Build Orders</span>
        <div className="menu" ref={menuRef} onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon icon={faEllipsisH}/>
          {showMenu?
            <MainMenu hideMenu={(() => setShowMenu(false))}/>
            :null}
        </div>
      </h1>
      {list}
      <button onClick={handleNewBuildClick}>
        <FontAwesomeIcon icon={faPlus}/><span>New Build</span>
      </button>
    </div>
  );
}

export default BuildOrderList;
