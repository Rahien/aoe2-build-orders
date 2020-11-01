import React, {useState} from "react";
import {faTimes, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import Switch from "react-switch";


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

  return <div className="settings">
    <h1>Settings</h1>

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
    <button className="cancel" onClick={cancelSettings}>
      <FontAwesomeIcon icon={faTimes}/>
      <span>Cancel</span>
    </button>
    <button onClick={saveSettings}>
      <FontAwesomeIcon icon={faCheck}/>
      <span>Save</span>
    </button>
  </div>;
}

export default Settings;
