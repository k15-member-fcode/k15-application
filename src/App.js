import React from "react";
import Home from "./Home";
import ApplicationPage from "./components/ApplicationPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = (props) => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route excat path="/application" component={ApplicationPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
