import React, { Component } from 'react';
import SimpleMap from './SimpleMap';
import CategorySelector from "./CategorySelector";
import axios from "axios"

class Home extends Component {
  constructor(props) {
    super(props);
    this.loadInfo();
    this.state = {
      loading: true,
    };
  }

  loadInfo() {
    axios.get('https://muralproject-483dd.firebaseio.com/murals.json')
    .then(res => {
      const muralList = res.data;
      let categoryList = [];
      let activeCategories = {};
      let modifiedMuralList = muralList.map((mural, i) => {
        const category = mural.category;
        activeCategories[category] = true;
        if (!categoryList.includes(category)) {
          categoryList.push(category);
        }
        mural["id"] = i;
        return mural;
      });

      this.setState({
        murals: modifiedMuralList,
        activeCategories: activeCategories,
        categoryList: categoryList,
        loading: false,
      });
    });
  }

  modifyCategory = category => {
    let activeCatCopy = JSON.parse(JSON.stringify(this.state.activeCategories));
    activeCatCopy[category.text] = category.selected;
    this.setState(prevState => {
      return {activeCategories: activeCatCopy};
    });
  }
  createMuralsList() {
    let murals = [];
    this.state.murals.forEach(mural => {
      if (this.state.activeCategories[mural.category]) {
        murals.push(mural);
      }
    })
    return murals;
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <div id="mapBox">
        <SimpleMap
          murals={this.createMuralsList()}
        />
        <CategorySelector
          categoryList={this.state.categoryList}
          activeCategories={this.state.activeCategories}
          modifyCategory={this.modifyCategory}
        />
      </div>
    );
  }
}

export default Home;
