import React from 'react';
import './App.scss';
import BuildOrder from "./BuildOrder";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BuildOrderList from "./BuildOrderList";
import BMC from "./BuyMeACoffee";
import EditBuildOrder from "./EditBuildOrder";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-body">
        <Router>
          <Switch>
            <Route path="/build/:id">
              <BuildOrder/>
            </Route>
            <Route path="/edit-build/:id">
              <EditBuildOrder/>
            </Route>
            <Route path="/">
              <BuildOrderList/>
            </Route>
          </Switch>
        </Router>
        <BMC/>
        <div className="wrap-960 game-content-useage-notice">Special thanks to Cicero for making his build orders available! The default build orders in this app are all his <span role="img" aria-label="heart">❤️</span> The source for this app is available on <a href="https://github.com/Rahien/aoe2-build-orders" target="_blank" rel="noopener noreferrer">github</a></div>
        <div className="wrap-960 game-content-useage-notice">Age of Empires II: HD© and Age of Empires II: Definitive Edition© Microsoft Corporation. AoE2-profile was created under Microsoft's <a href="https://www.xbox.com/en-US/developers/rules" target="_blank" rel="noopener noreferrer">"Game Content Usage Rules"</a> using assets from Age of Empires II: Definitive Edition, and it is not endorsed by or affiliated with Microsoft.</div>
      </div>
    </div>
  );
}

export default App;
