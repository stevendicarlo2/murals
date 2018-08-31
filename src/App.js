import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleMap from './SimpleMap';
import CategorySelector from "./CategorySelector";
import muralList from "./muralList.json";

class App extends Component {
  constructor(props) {
    super(props);
    let categoryList = [];
    for (let category in muralList) {
      categoryList.push({"text": category, "selected": true});
    };
    this.state = {
      murals: muralList,
      categoryList: categoryList,
    };
  }

  modifyCategory = category => {
    let catListCopy = JSON.parse(JSON.stringify(this.state.categoryList));
    catListCopy.forEach((item, i) => {
      if (item.text === category.text) {
        catListCopy[i].selected = category.selected;
      }
    });
    this.setState(prevState => {
      return {categoryList: catListCopy};
    });
  }
  createMuralsList() {
    let murals = [];
    this.state.categoryList.forEach(category => {
      if (category.selected) {
        this.state.murals[category.text].forEach(item => {
          murals.push(item);
        });
      }
    })
    return murals
  }

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
        <div id="mapBox">
          <SimpleMap
            murals={this.createMuralsList()}
          />
          <CategorySelector
            categoryList={this.state.categoryList}
            modifyCategory={this.modifyCategory}
          />
        </div>
      </div>
    );
  }
}

export default App;
