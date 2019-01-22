import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from "./Home";
import Menu from "./Menu";
import MuralDetail from "./MuralDetail";
import About from "./About";
import HowDoesItWork from "./HowDoesItWork";
import RecommendMural from "./RecommendMural";
import Feedback from "./Feedback";
import ArtistDetail from "./ArtistDetail";
import {Helmet} from "react-helmet";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>My Title</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
        </Helmet>
        <Route exact={true} path={"/"} component={Home}/>
        <Route exact={true}
          path={"/menu"}
          render={(props) => <Menu {...props}
          linkList={[
            {"text": "About", "link": "/about"},
            {"text": "How does it work?", "link": "/details"},
            {"text": "Recommend a mural", "link": "/recommend"},
            {"text": "Feedback", "link": "/feedback"}
          ]}
          />}
        />
        <Route exact={true} path={"/detail/:id"} component={MuralDetail}/>
        <Route exact={true} path={"/about"} component={About}/>
        <Route exact={true} path={"/details"} component={HowDoesItWork}/>
        <Route exact={true} path={"/recommend"} component={RecommendMural}/>
        <Route exact={true} path={"/feedback"} component={Feedback}/>
        <Route exact={true} path={"/artist/:id"} component={ArtistDetail}/>
      </div>
    );
  }
}

export default App;
