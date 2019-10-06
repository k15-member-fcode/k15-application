import React from "react";
import HomePage from "./components/HomePage/HomePage";
import ApplicationPage from "./components/ApplicationPage";
import Verify from "./components/Verify";
import Admin from "./components/Admin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/application" component={ApplicationPage} />
          <Route path="/verify" component={Verify} />
          <Route path="/admin" component={Admin} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
