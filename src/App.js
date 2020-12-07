import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PublicNavbar from "./components/PublicNavbar";
import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import AboutMovie from "./pages/AboutMovie";

function App() {
  return (
    <Router>
      <div className="background">
        <PublicNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/toprated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/movies/:id" component={AboutMovie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
