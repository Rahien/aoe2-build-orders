import {IBuildOrder} from "./types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faBars, faSync} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { useHistory } from "react-router-dom";

const handleDownload = (build:IBuildOrder) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(build, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", build.name + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

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
      handleDownload(build);
      hideMenu();
    }}>
      <FontAwesomeIcon icon={faDownload}/>
      <label>Download</label>
    </div>
  </div>
};

export default BuildOrderMenu;