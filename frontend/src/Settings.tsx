import React, {useState} from "react";
import {faTimes, faCheck, faSync} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import Switch from "react-switch";
import {defaultBuildOrders} from "./defaultBuildOrders";
import {getBuildOrders} from "./BuildOrderList";

export const speedBonuses = {
  malayBonus: !!JSON.parse(window.localStorage.getItem("settings") || "{}").malayTC,
  persianBonus: !!JSON.parse(window.localStorage.getItem("settings") || "{}").persianTC,
  portugueseTechs: !!JSON.parse(window.localStorage.getItem("settings") || "{}").portugueseTechs,
  gameSpeed: JSON.parse(window.localStorage.getItem("settings") || "{}").gameSpeed || 5/3,
}

const Settings:React.FC = () => {
  const history = useHistory();
  const [settings, setSettings] = useState(JSON.parse(window.localStorage.getItem('settings') || "{}"));
  const saveSettings = () => {
    window.localStorage.setItem('settings', JSON.stringify(settings));
    history.push('/');
  }
  const cancelSettings = () => {
    history.push('/');
  }

  const updateSetting = (setting:string, value:any) => {
    const newSettings = JSON.parse(JSON.stringify(settings));
    newSettings[setting] = value;
    setSettings(newSettings);
  }

  const handleRestoreDefaults = () => {
    const buildOrders = getBuildOrders();
    Object.assign(buildOrders, defaultBuildOrders);
    localStorage.setItem('buildOrders', JSON.stringify(buildOrders));
    history.push('/');
  }


  return <div className="settings">
    <h1>Settings</h1>

    <div className="version">
      {process.env.REACT_APP_NAME} v.{process.env.REACT_APP_VERSION}
    </div>

    <div className={`property number`}>
      <label>Countdown from</label>
      <input type="number" min={0} step={1}
             value={typeof settings.countDown === "undefined" ? 3 : settings.countDown}
             onChange={(e) => {
               updateSetting("countDown", parseInt(e.target.value));
             }}/>
    </div>
    <div className={`property boolean`}>
      <label>Marking per Villager</label>
      <Switch onChange={() => updateSetting("markingPerVil", !settings.markingPerVil)} checked={!!(settings.markingPerVil == null?true:settings.markingPerVil)} />
    </div>
    <div className={`property boolean`}>
      <label>Read Steps Out Loud</label>
      <Switch onChange={() => updateSetting("readStepsOutLoud", !settings.readStepsOutLoud)} checked={!!(settings.readStepsOutLoud == null?true:settings.readStepsOutLoud)} />
    </div>
    <div className={`property boolean`}>
      <label>Malay TC</label>
      <Switch onChange={() => {
        const newValue = !settings.malayTC;
        updateSetting("malayTC", newValue);
        speedBonuses.malayBonus = newValue;
      }} checked={!!(settings.malayTC == null?false:settings.malayTC)} />
    </div>
    <div className={`property boolean`}>
      <label>Persian TC</label>
      <Switch onChange={() => {
        const newValue = !settings.persianTC;
        updateSetting("persianTC", newValue);
        speedBonuses.persianBonus = newValue;
      }} checked={!!(settings.persianTC == null?false:settings.persianTC)} />
    </div>
    <div className={`property boolean`}>
      <label>Portuguese Techs</label>
      <Switch onChange={() => {
        const newValue = !settings.portugueseTechs;
        updateSetting("portugueseTechs", newValue);
        speedBonuses.portugueseTechs = newValue;
      }} checked={!!(settings.portugueseTechs == null?false:settings.portugueseTechs)} />
    </div>
    <button onClick={handleRestoreDefaults}>
      <FontAwesomeIcon icon={faSync}/>
      <span>Restore Default Builds</span>
    </button>
    <button onClick={saveSettings}>
      <FontAwesomeIcon icon={faCheck}/>
      <span>Save</span>
    </button>
    <button className="cancel" onClick={cancelSettings}>
      <FontAwesomeIcon icon={faTimes}/>
      <span>Cancel</span>
    </button>

  </div>;
}

export default Settings;
