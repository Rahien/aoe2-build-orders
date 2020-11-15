import React, {useCallback, useEffect, useRef, useState} from 'react';
import './App.scss';
import BuildOrder from "./BuildOrder";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BuildOrderList from "./BuildOrderList";
import EditBuildOrder from "./EditBuildOrder";
import Settings from "./Settings";
import Footer from "./Footer";
import {faMobileAlt, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BeforeInstallPromptEvent} from "./types";

function App() {
  const [hideInstall, setHideInstall] = useState(true);
  const [displayMode, setDisplayMode] = useState("browser-tab");
  const deferredPrompt = useRef<BeforeInstallPromptEvent>();
  const handleBeforeInstall = useCallback((e:Event) => {
    const installPrompt = e as BeforeInstallPromptEvent;
    installPrompt.preventDefault();
    deferredPrompt.current = installPrompt;
    setHideInstall(false);
  }, []);
  const handleDomContentLoaded = useCallback(() => {
    // @ts-ignore
    if (navigator.standalone) {
      setDisplayMode('standalone-ios');
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setDisplayMode('standalone');
    }
  }, []);
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    }
  }, [handleBeforeInstall]);

  useEffect(() => {
    window.addEventListener('DOMContentLoaded', handleDomContentLoaded);
    return () => {
      window.removeEventListener('DOMContentLoaded', handleDomContentLoaded);
    }
  }, [handleDomContentLoaded]);


  const installApp = () => {
    if(!deferredPrompt.current){
      return;
    }
    deferredPrompt.current.prompt();
    deferredPrompt.current.userChoice.then(() => {
      setHideInstall(true);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="new-content-loaded" id="new-content-loaded" onClick={() => {
        const element = document.getElementById("new-content-loaded");
        element && element.setAttribute("style", "display: none;");
      }}>
        <p>An update is available! </p>
        <p>Close the app and restart to apply the upgrade</p>
      </div>
      <div
        className={`install-app ${hideInstall?"hidden":"shown"} ${displayMode}`}
        onClick={installApp}
      >
        <FontAwesomeIcon icon={faMobileAlt}/>
        <label>Install the App</label>
        <button onClick={(e) => {
          setHideInstall(true);
          e.stopPropagation();
        } }>
          <FontAwesomeIcon icon={faTimes}/>
        </button>
      </div>
      <div className="App-body">
        <Router>
          <Switch>
            <Route path="/build/:id">
              <BuildOrder/>
            </Route>
            <Route path="/edit-build/:id">
              <EditBuildOrder/>
              <Footer/>
            </Route>
            <Route path="/settings">
              <Settings/>
              <Footer/>
            </Route>
            <Route path="/">
              <BuildOrderList/>
              <Footer/>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
