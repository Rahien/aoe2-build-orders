import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync, faCog} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useHistory } from "react-router-dom";
import {defaultBuildOrders} from "./defaultBuildOrders";
import {getBuildOrders} from "./BuildOrderList";

const handleRestoreDefaults = () => {
  const buildOrders = getBuildOrders();
  Object.assign(buildOrders, defaultBuildOrders);
  localStorage.setItem('buildOrders', JSON.stringify(buildOrders));
}

interface IMainMenuProps {
  hideMenu: () => void
}

const MainMenu:React.FC<IMainMenuProps> = () => {
  const history = useHistory();
  return <div className="menu">
    <div className="menu-item" onClick={() => {
      history.push('/settings');
    }}>
      <FontAwesomeIcon icon={faCog}/>
      <label>Settings</label>
    </div>
    <div className="menu-item" onClick={() => {
      handleRestoreDefaults();
      history.go(0);
    }}>
      <FontAwesomeIcon icon={faSync}/>
      <label>Restore Defaults</label>
    </div>
  </div>
};

export default MainMenu;