import {IBuildOrder} from "./types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faCog, faBars, faSync, faClone, faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {deleteBuildOrder, setBuildOrder} from "./BuildOrderList";

const handleDownload = (build:IBuildOrder) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(build, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", build.name + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

const handleDuplicate = (build:IBuildOrder) => {
  const id = uuidv4();
  const newBuild = JSON.parse(JSON.stringify(build));
  newBuild.id = id;
  newBuild.name = newBuild.name + " (copy)";
  delete newBuild.attribution;
  setBuildOrder(id, newBuild);
  return id;
}

interface IBuildOrderMenuProps {
  build: IBuildOrder,
  hideMenu: () => void,
  restartBuild: () => void
}

const BuildOrderMenu:React.FC<IBuildOrderMenuProps> = ({build, restartBuild, hideMenu}) => {
  const history = useHistory();
  return <div className="menu">
    <div className="menu-item" onClick={() => {
      history.push('/');
      hideMenu();
    }}>
      <FontAwesomeIcon icon={faBars}/>
      <label>Show List</label>
    </div>
    <div className="menu-item" onClick={() => {
      restartBuild();
      hideMenu();
    }}>
      <FontAwesomeIcon icon={faSync}/>
      <label>Restart</label>
    </div>
    <div className="menu-item" onClick={() => {
      history.push(`/edit-build/${build.id}`);
      hideMenu();
    }}>
      <FontAwesomeIcon icon={faPencilAlt}/>
      <label>Edit</label>
    </div>
    <div className="menu-item" onClick={() => {
      const newId = handleDuplicate(build);
      history.push(`/edit-build/${newId}`);
      hideMenu();
    }}>
      <FontAwesomeIcon icon={faClone}/>
      <label>Duplicate</label>
    </div>
    <div className="menu-item" onClick={() => {
      handleDownload(build);
      hideMenu();
    }}>
      <FontAwesomeIcon icon={faDownload}/>
      <label>Download</label>
    </div>
    <div className="menu-item" onClick={() => {
      history.push('/settings');
      hideMenu();
    }}>
      <FontAwesomeIcon icon={faCog}/>
      <label>Settings</label>
    </div>
    <div className="menu-item" onClick={() => {
      deleteBuildOrder(build.id);
      history.push("/");
      hideMenu();
    }}>
      <FontAwesomeIcon icon={faTrash}/>
      <label>Remove</label>
    </div>
  </div>
};

export default BuildOrderMenu;