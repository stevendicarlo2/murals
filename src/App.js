import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Menu from "./Menu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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
      </div>
    );
  }
}

export default App;
