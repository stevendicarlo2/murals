import React, { Component } from 'react';
import SimpleMap from './SimpleMap';
import CategorySelector from "./CategorySelector";
import muralList from "./muralList.json";

class Home extends Component {
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
      <div id="mapBox">
        <SimpleMap
          murals={this.createMuralsList()}
        />
        <CategorySelector
          categoryList={this.state.categoryList}
          modifyCategory={this.modifyCategory}
        />
      </div>
    );
  }
}

export default Home;
