import React from 'react';
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

function App() {
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
